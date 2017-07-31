angular.module('teamFactory').factory('TeamServiceFactory',
    function () {
        let ts = new TeamService(DbConnection.getConnection());
        console.log(ts);
        return ts;
    }
);