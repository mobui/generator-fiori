sap.ui.jsview("<%= namespace %>.view.App", {

	getControllerName: function() {
		'use strict'
		return "<%= namespace %>.controller.App";
	},

	createContent: function(oController) {
		'use strict'
		var app = new sap.m.SplitApp(this.createId("appId"), {});

		return app;
	}

});