sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"<%= namespacePath %>/model/models",
	"<%= namespacePath %>/Router",
	"<%= namespacePath %>/controller/Application"
], function(UIComponent, Device, models, Router, Application) {
	"use strict";

	return UIComponent.extend("<%= namespace %>.Component", {
		metadata: {
			"version": "0.0.1",
			"rootView": {
				viewName: "<%= namespace %>.view.App",
				type: sap.ui.core.mvc.ViewType.JS
			},
			"dependencies": {
				"libs": ["sap.ui.core", "sap.m", "sap.ui.layout"]
			},
			"config": {
				"i18nBundle": "<%= namespace %>.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": "",
				serviceConfig: {
					name: "ODATA_SERVICE",
					serviceUrl: "<%= serviceURL %>"
				}
			},
			routing: {
				config: {
					routerClass: "<%= namespace %>.Router",
					viewType: sap.ui.core.mvc.ViewType.JS,
					viewPath: "<%= namespace %>.view", 
					controlId: "appId",
					bypassed: {
						target: ["masterPage", "notFound"]
					}
				},
				routes: [
					{
						pattern: "",
						name: "home",
						target: ["home","masterPage"]
					}
				],
				targets: {
					masterPage:{
						viewName:"MasterPage",
						viewLevel: "1",
						controlAggregation: "masterPages"
					},
					detailPage:{
						viewName:"DetailPage",
						viewLevel: "2",
						controlAggregation: "detailPages"
					},
					home: {
						viewName: "Home",
						viewLevel: 3,
						controlAggregation: "detailPages"
					},
					notFound:{
						viewName: "NotFound",
						viewLevel: 1,
						controlAggregation: "detailPages"
					}
				}
			}
		},

		init: function() {
			var mConfig = this.getMetadata().getConfig();

           this.setModel(models.createODataModel(mConfig.serviceConfig.serviceUrl,{}));
			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");
			this.setModel(models.createDeviceModel(), "device");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			var app = new Application(this);
			app.init();

			this.getRouter().initialize();
		},
		
    })
});