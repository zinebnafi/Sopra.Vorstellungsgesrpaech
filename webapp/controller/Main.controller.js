sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    'sap/ui/core/theming/Parameters',
    "../model/InitPage",
    "../model/formatter",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/data/DimensionDefinition",
    "sap/viz/ui5/data/MeasureDefinition"
], function (Controller, BindingMode, JSONModel, ChartFormatter, Format, Parameters, InitPage, oFormatter, FlattenedDataset, DimensionDefinition, MeasureDefinition) {
    "use strict";

    return Controller.extend("project.controller.Main", {

        zinebFormatter: oFormatter,

        oVizFrame: null,

        onInit: async function (evt) {

            const oTreeModel = new sap.ui.model.json.JSONModel();
            oTreeModel.loadData("../model/data.json", null, false);
            this.getView().setModel(oTreeModel, "Tree");
            await InitPage.initPageSettings(this.getView());



            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            const oBundle = this.getView().getModel("i18n").getResourceBundle();
            oVizFrame.setVizProperties({
                plotArea: {

                    colorPalette: ["#FF0000"]
                },
                title: { visible: true, text: oBundle.getText("lblGraph") }
            });

            var dataModel = new JSONModel();
            dataModel.loadData("../model/datadashboard.json", null, false);
            this.getView().byId("chartFixFlex").setModel(dataModel);



            // Bind measure to the default city
            this.getView().byId("idSelect").setSelectedKey("Wolfsburg");
            this._rebuildDatasetForCity("Wolfsburg");
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString("0.00");

            var that = this;
            dataModel.attachRequestCompleted(function () {
                that.dataSort(this.getData());
            });
        },
        onDatasetSelected: function (oEvent) {
            const sCity = oEvent.getSource().getSelectedKey();

            this._rebuildDatasetForCity(sCity);
        },


        _rebuildDatasetForCity: function (sCity) {
            const oViz = this.byId("idVizFrame");
            const oNew = new FlattenedDataset({
                dimensions: [new DimensionDefinition({ name: "KPI", value: "{kpi}" })],
                measures: [new MeasureDefinition({ name: "Wert", value: "{" + sCity + "}" })],
                data: { path: "/datadashboard/values" }
            });
            oViz.setDataset(oNew);

        },
        onCollapseAll: function () {
            const oTreeTable = this.byId("TreeTableBasic");
            oTreeTable.collapseAll();
        },
        onExpand: function () {
            const oTreeTable = this.byId("TreeTableBasic");
            oTreeTable.expandToLevel(2);
        }
    });
});