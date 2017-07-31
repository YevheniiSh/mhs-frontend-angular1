'use strict';
angular.module('resultSetup').factory('resultSetupService', ['GameServiceFactory','$q','$routeParams',
    function (gameFactory,$q,$routeParams) {
    var service = {
        getData: getData,
        setData: setData
    }

    function getData() {
        let defer = $q.defer();
        gameFactory.getGameById($routeParams.gameId)
            .then((game) => {
                defer.resolve(game.val());
            });
        return defer.promise;
    }
    function setData(result,score) {
        let defer = $q.defer();
        result.setScore(score)
        gameFactory.saveResult(result, $routeParams.gameId).then((resultKey) => {
            defer.resolve(resultKey);
        });
        return defer.promise;
    }

    return service;
}]);