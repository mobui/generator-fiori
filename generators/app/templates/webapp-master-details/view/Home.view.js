sap.ui.jsview("<%= namespace %>.view.Home", {

	getControllerName: function() {
		return "<%= namespace %>.controller.Home";
	},

	createContent: function(oController) {

		var oPage = new sap.m.Page({
			title: "Home"
		});

		return oPage;
	}

});