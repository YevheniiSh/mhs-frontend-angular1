'use strict';
angular.module('mhs.admin').factory('resultSetupService', function ($q) {
    var gameService = new GameService(DbConnection.getConnection());
    var service = {
        getData: getData,
        setData: setData
    }

    function getData() {
        let defer = $q.defer();
        gameService.getGameById('-KqClHrHpGmoZRcKfOZI')
            .then((game) => {
                defer.resolve(game.val());
            });
        return defer.promise;
    }
    function setData(result) {
        let defer = $q.defer();
        let result = new Result(roundNumber, quizNumber, teamId);
        result.setScore(score)
        resultService.saveResult(result, '-KqClHrHpGmoZRcKfOZI').then((resultKey) => {
            defer.resolve(resultKey);
        });
        return defer.promise;
    }

    return service;
});