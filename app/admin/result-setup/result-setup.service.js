'use strict';
(function () {
    angular
        .module('resultSetup')
        .factory('resultSetupService', resultSetupService);

    resultSetupService.$inject = ['GameServiceFactory', 'ResultServiceFactory'];

    function resultSetupService(gameFactory, resultFactory) {
        return {
            getRound: getRound,
            getGameTeams: getGameTeams,
            saveQuizResult: saveQuizResult,
            roundIncrement: roundIncrement,
            getQuizResults: getQuizResults,
            getCurrentQuiz: getCurrentQuiz,
            getCurrentRound: getCurrentRound,
            saveQuizResults: saveQuizResults,
            setCurrentQuiz: setCurrentQuiz
        };

        function getGameTeams(gameId) {
            return gameFactory.getGameTeams(gameId)
                .then(
                    (teams) => {
                        return teams;
                    },
                    (err) => {
                        throw err;
                    }
                )
        }

        function saveQuizResult(result, gameId) {
            resultFactory.saveResult('current', prepareResultToSave(result), gameId);
        }

        function saveQuizResults(results, gameId) {
            results.forEach((result) => {
                if (result.score === undefined) {
                    result.score = 0;
                    saveQuizResult(result, gameId)
                }
            })
        }

        function getQuizResults(roundId, quizId, gameId) {
            return resultFactory.getByRoundAndQuiz(roundId, quizId, gameId);
        }

        function getRound(gameId, roundId) {
            return gameFactory.getRoundByGameAndId(gameId, roundId);
        }

        function roundIncrement(roundNumber, gameId) {
            roundNumber++;
            return gameFactory.setCurrentRound(roundNumber, gameId);
        }

        function getCurrentQuiz(gameId) {
            return gameFactory.getCurrentQuiz(gameId);
        }

        function setCurrentQuiz(currentQuiz, gameId) {
            return gameFactory.setCurrentQuiz(currentQuiz, gameId);
        }

        function getCurrentRound(gameId) {
            return gameFactory.getCurrentRound(gameId);
        }

        function prepareResultToSave(result) {
            let res = angular.copy(result);
            delete res.$$hashKey;
            delete res.teamName;
            return res;
        }
    }
})();