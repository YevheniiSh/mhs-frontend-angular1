angular.module('teamFactory').factory('TeamServiceFactory', ['dbConnection',
    function (dbConn) {
        console.log(dbConn)
        let ts = new TeamService(dbConn);
        console.log(ts);
        return ts;
    }]
);