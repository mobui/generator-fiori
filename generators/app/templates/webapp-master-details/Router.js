sap.ui.define([
	"sap/m/routing/Router",
    "sap/ui/core/routing/History"
], function(Router, History) {
	"use strict";

	return  Router.extend("<%= namespace %>.Router", {
       init: function(){
            Router.prototype.init.apply(this, arguments);
       },
       
       onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.navTo("home", {}, true);
			}
		}
	});

});