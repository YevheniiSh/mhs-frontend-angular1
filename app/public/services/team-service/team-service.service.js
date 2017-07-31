angular.module('teamFactory').factory('TeamServiceFactory', ['dbConnection',
    function (dbConn) {
        let ts = new TeamService(dbConn);
        return ts;
    }]
);