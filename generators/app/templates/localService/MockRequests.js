sap.ui.define(["sap/ui/base/Object"], function(Object) {
    "use strict";

    return Object.extend("<%= namespace %>.localService.MockRequests", {
        constructor: function(oMockServer) {
            this._oMockServer = oMockServer;
        },

        getRequests: function() {
            return (this._oMockServer.attachAfter) ? [ 

            ] : [
            ];
        }
    });
});
		