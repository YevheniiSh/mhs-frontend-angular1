angular.module('gameFactory').factory('GameServiceFactory', ['dbConnection', function (dbConnection) {
    let gs = new GameService(dbConnection);
    return gs;
}]);
