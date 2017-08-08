'use strict';
angular.module('resultSetup').factory('resultSetupService', [
    'GameServiceFactory',
    'ResultServiceFactory',
    '$q',
    '$routeParams',
    function (gameFactory, ResultServiceFactory, $q, $routeParams) {
        function getData(gameId) {
            let defer = $q.defer();
            gameFactory.getGameById(gameId)
                .then((game) => {
                    defer.resolve(game);
                });
            return defer.promise;
        }

        function setQuizResult(result) {
            let defer = $q.defer();
            ResultServiceFactory.saveResult(result, $routeParams.gameId).then((resultKey) => {
                defer.resolve(resultKey);
            });
            return defer.promise;
        }

        function getQuizResult(gameId, roundNumber, quizNumber) {
            let defer = $q.defer();
            ResultServiceFactory.getByRoundAndQuiz(roundNumber, quizNumber, gameId)
                .then((results) => {
                    defer.resolve(results);
                });

            return defer.promise;
        }

        function roundIncrement(roundNumber, gameId) {
            roundNumber++;
            let defer = $q.defer();
            gameFactory.setCurrentRound(roundNumber, gameId)
                .then((res) => {
                    defer.resolve(res);
                })
        }

        function createResult(gameId, round, teamId, score) {
            return {
                gameId: gameId,
                round: round,
                teamId: teamId,
                score: score
            }
        }

        return {
            getData: getData,
            setQuizResult: setQuizResult,
            getQuizResult: getQuizResult,
            roundIncrement: roundIncrement,
            createResult: createResult
        };
    }]);