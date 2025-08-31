sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    'sap/ui/core/theming/Parameters',
    "../model/InitPage"
], function (Controller, BindingMode, JSONModel, ChartFormatter, Format, Parameters, InitPage) {
    "use strict";

    var Controller = Controller.extend("project.controller.Main", {



        oVizFrame: null,

        onInit: async function (evt) {

            const oTreeModel = new sap.ui.model.json.JSONModel();
            oTreeModel.loadData("../model/data.json", null, false);
            this.getView().setModel(oTreeModel, "Tree");
            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;
            await InitPage.initPageSettings(this.getView());

            var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: { formatString: formatPattern.SHORTFLOAT_MFD2, visible: false },
                    polarAxis: { label: { formatString: formatPattern.SHORTFLOAT_MFD2 }, title: { visible: true } },
                    valueAxis: { label: { formatString: formatPattern.SHORTFLOAT_MFD2 }, title: { visible: true } },

                    // 🔴 hard-coded red for the series (line + area)
                    colorPalette: ["#FF0000"]   // or "rgb(255,0,0)"
                },
                title: { visible: true, text: 'Radar Graphic for Skills' }
            });

            var dataModel = new JSONModel();
            dataModel.loadData("../model/datadashboard.json", null, false);
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);

            var that = this;
            dataModel.attachRequestCompleted(function () {
                that.dataSort(this.getData());
            });
        },


        onCollapseAll: function () {
            const oTreeTable = this.byId("TreeTableBasic");
            oTreeTable.collapseAll();
        },
        onExpand: function () {
            const oTreeTable = this.byId("TreeTableBasic");
            oTreeTable.expandToLevel(3);
        }
    });
});