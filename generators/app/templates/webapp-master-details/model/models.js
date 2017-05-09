sap.ui.define([
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/Device"
], function(ResourceModel,JSONModel,ODataModel,Device) {
	"use strict";

	return {
		createResourceModel: function(sBundleName) {
			var oResourceModel = new ResourceModel({
				"bundleName": sBundleName
			});
			return oResourceModel;
		},
		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createODataModel: function(url, config){
			return new ODataModel(url, config);
		},
		createJSONModel:function(sData){
		    var model = new sap.ui.model.json.JSONModel();
		    model.setData(sData);
		    return model;
		}
	};
});