'use strict';
angular.module('resultSetup').factory('resultSetupService', [
    'GameServiceFactory',
    'ResultServiceFactory',
    function (gameFactory, ResultServiceFactory) {

        function getGameTeams(gameId) {
            return gameFactory.getGameTeams(gameId)
                .then(
                    (teams) => {
                        return teams;
                    },
                    (err) => {
                        console.log(err);
                        throw err;
                    }
                )
        }

        function setQuizResult(result) {
            return resultSetupService.setQuizResult(result);
        }

        function getQuizResult(gameId, roundNumber, quizNumber) {
            resultSetupService.setQuizResult(gameId, roundNumber, quizNumber);
        }

        function getRound(gameId, roundId) {
            return gameFactory.getRoundByGameAndId(gameId, roundId);
        }

        function initQuizResults(gameId, round, quiz) {
            let result = [];
            gameFactory.getGameTeams(gameId)
                .then(
                    (teams) => {
                        angular.forEach(teams, function (team, key) {
                            result.push(buildResult(round, quiz, key));
                        })
                        return result;
                    }
                )

        }

        function roundIncrement(roundNumber, gameId) {
            roundNumber++;
            let defer = $q.defer();
            gameFactory.setCurrentRound(roundNumber, gameId)
                .then((res) => {
                    defer.resolve(res);
                })
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
            setQuizResult: setQuizResult,
            getQuizResult: getQuizResult,
            roundIncrement: roundIncrement,
            buildResult: buildResult,
            initQuizResults: initQuizResults
        };
    }]);