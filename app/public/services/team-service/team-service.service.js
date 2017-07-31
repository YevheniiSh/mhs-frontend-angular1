angular.module('teamService').factory('TeamService', ['$dbConnection',
    function ($dbConnection) {
        return new TeamService($dbConnection);
    }
]);