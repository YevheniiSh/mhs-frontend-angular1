'use strict';
angular.module('resultSetup').factory('resultSetupService', [
    'GameServiceFactory',
    'ResultServiceFactory',
    function (gameFactory, resultFactory) {
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
            let res = buildResult(result.round, result.quiz, result.teamId, result.score);
            return resultFactory.saveResult(res, gameId);
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

        function getCurrentRound(gameId) {
            return gameFactory.getCurrentRound(gameId);
        }

        function buildResult(round, quiz, teamId, score) {
            return {
                quiz: quiz,
                round: round,
                teamId: teamId,
                score: score
            }
        }


        return {
            getRound: getRound,
            getGameTeams: getGameTeams,
            saveQuizResult: saveQuizResult,
            roundIncrement: roundIncrement,
            buildResult: buildResult,
            getQuizResults: getQuizResults,
            getCurrentQuiz: getCurrentQuiz,
            getCurrentRound: getCurrentRound
        };
    }]);