angular.module('gameFactory').factory('GameServiceFactory', function () {
    let gs = new GameService(DbConnection.getConnection());
    return gs;
});
