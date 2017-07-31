angular.module('resultService').factory('ResultServiceFactory', ['dbConnection',
    function (dbConn) {
        return new ResultService(dbConn);
    }]
);