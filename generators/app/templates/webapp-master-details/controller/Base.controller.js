sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"<%= namespacePath %>/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("<%= namespace %>.controller.Base", {
	    formatter: formatter,
	    getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
	    }
	});

});