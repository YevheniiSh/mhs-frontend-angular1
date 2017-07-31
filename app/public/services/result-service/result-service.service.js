angular.module('resultFactory').factory('ResultServiceFactory', ['dbConnection',
    function (dbConn) {
        let ts = new ResultService(dbConn);
        return ts;
    }]
);