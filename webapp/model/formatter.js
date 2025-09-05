

sap.ui.define([], () => {
    "use strict";

    return {
        displayValue(KPIValue, KPIType) {
            const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            if (KPIType === "positiv") {
                if (KPIValue < 50) {
                    return oResourceBundle.getText("statusLow");
                } else if (KPIValue >= 50 && KPIValue < 65) {
                    return oResourceBundle.getText("statusPassable");
                } else if (KPIValue >= 65 && KPIValue < 75) {
                    return oResourceBundle.getText("statusFair");
                } else if (KPIValue >= 75 && KPIValue < 85) {
                    return oResourceBundle.getText("statusGood");
                } else if (KPIValue >= 85) {
                    return oResourceBundle.getText("statusVeryGood");
                } else {
                    return KPIValue;
                }
            }
            else if (KPIType === "negativ") {
                if (KPIValue < 15) {
                    return oResourceBundle.getText("statusVeryGood");
                } else if (KPIValue >= 15 && KPIValue < 25) {
                    return oResourceBundle.getText("statusGood");
                } else if (KPIValue >= 25 && KPIValue < 35) {
                    return oResourceBundle.getText("statusFair");
                } else if (KPIValue >= 35 && KPIValue < 50) {
                    return oResourceBundle.getText("statusPassable");
                } else if (KPIValue >= 50) {
                    return oResourceBundle.getText("statusLow");
                } else {
                    return KPIValue;
                }
            }
        }
    };
});