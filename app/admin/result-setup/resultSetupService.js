'use strict';
angular.module('mhs.admin').factory('resultSetupService', function ($q) {
    let gameService = new GameService(DbConnection.getConnection());
    return {
        getData: function () {
            let defer = $q.defer();
            gameService.getGameById('-KqClHrHpGmoZRcKfOZI')
                .then((game) => {
                    defer.resolve(game.val());
                });
            return defer.promise;
        },
        setData: function (roundNumber, quizNumber, teamId, score) {
            let defer = $q.defer();
            let result = new Result(roundNumber, quizNumber, teamId);
            result.setScore(score)
            resultService.saveResult(result, '-KqClHrHpGmoZRcKfOZI').then((resultKey) => {
                defer.resolve(resultKey);
            });
            return defer;
        }
    }
});