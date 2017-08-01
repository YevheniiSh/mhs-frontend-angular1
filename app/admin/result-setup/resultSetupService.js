'use strict';
angular.module('resultSetup').factory('resultSetupService', [
    'GameServiceFactory',
    'ResultServiceFactory',
    '$q',
    '$routeParams',
    function (gameFactory,ResultServiceFactory,$q,$routeParams) {
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
        ResultServiceFactory.saveResult(result, $routeParams.gameId).then((resultKey) => {
            defer.resolve(resultKey);
        });
        return defer.promise;
    }
    function getQuizResult() {

    }

    return service;
}]);