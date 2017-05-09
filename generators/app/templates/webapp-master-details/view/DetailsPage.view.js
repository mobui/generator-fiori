sap.ui.jsview("<%= namespace %>.view.DetailsPage", {


	getControllerName: function() {
		'use strict'
		return "<%= namespace %>.controller.DetailsPage";
	},

	createContent: function(oController) {  
            var oPage = new sap.m.Page({
                title: "Details Page"
            });
            return oPage; 
	    }

});