angular
    .module('resultService')
    .factory('ResultServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService', 'GameServiceFactory', function ($firebaseArray, $firebaseObject, firebaseDataService, gameService) {

        let currentRef = firebaseDataService.currentGames;
        let finishedRef = firebaseDataService.finishedGames;


            let resultFactory = {};

        function resultKey(result) {
            return [result.round, result.quiz, result.teamId].join('_');
        }

        resultFactory.saveResult = function (state, result, gameId) {
            let ref;
            if (state === "current") {
                ref = currentRef;
            }
            else if (state === "finished") {
                ref = finishedRef;
            }
            let resultKey = [result.round, result.quiz, result.teamId].join('_');
            let resultRef = ref.child(`${gameId}/results/${resultKey}/`);
            let resultObj = new $firebaseObject(resultRef);
            resultObj.$value = result;
            return resultObj.$save()
                .then(
                    () => {
                        return resultKey;
                    },
                    (err) => {
                        throw err;
                    }
                );
        };

        resultFactory.filter = function (filter, gameId) {
            let ref = gameService.getGameRef(gameId);
            return ref.then((res) => {
                let firebaseArr = new $firebaseArray(res.child(`/${gameId}/results`).orderByChild(filter.by).equalTo(filter.val));
                return firebaseArr.$loaded();
            });
            };

        resultFactory.getGameResults = function (gameId) {
            let ref = gameService.getGameRef(gameId);

            return ref.then((res) => {
                console.log(res);
                let firebaseArr = new $firebaseArray(res.child(`/${gameId}/results`));
                return firebaseArr.$loaded();
            })

            };

            resultFactory.getByRoundAndQuiz = function (roundId, quizId, gameId) {
                let resultRef = currentRef
                    .child(`/${gameId}/results/`)
                    .orderByKey()
                    .startAt(`${roundId}_${quizId}_`)
                    .endAt(`${roundId}_${quizId}_~`);
                let resultObj = new $firebaseObject(resultRef);
                return resultObj.$loaded();
            };



        resultFactory.parseTeamsResult = function (gameResults) {
            let roundResult = {};
            gameResults.forEach((quizResult) => {
                roundResult[quizResult.teamId] = {rounds: {}, total: 0};
            });
            gameResults.forEach((quizResult) => {
                let roundScore = roundResult[quizResult.teamId].rounds[quizResult.round] || 0;
                roundResult[quizResult.teamId].rounds[quizResult.round] = roundScore + quizResult.score;
            });
            let result = [];
            for (let team in roundResult) {
                let teamRounds = [];
                let totalResult = 0;
                for (let round in roundResult[team].rounds) {
                    teamRounds.push({roundNumber: round, score: roundResult[team].rounds[round].toFixed(1)});
                    totalResult += roundResult[team].rounds[round];
                }
                result.push({teamId: team, rounds: teamRounds, total: totalResult.toFixed(1)});
            }
            return result;
        };

        resultFactory.setTeamName = function (score, gameId) {
            return gameService.getGameTeams(gameId)
                .then((teams) => {
                    score.forEach(teamScore => {
                        teams.forEach(team => {
                            if (teamScore.teamId === team.teamId) {
                                teamScore.teamName = team.name;
                            }
                        });
                    });
                    return score;
                })
        };

        resultFactory.sortDesc = function (score) {
            return score.sort((a, b) => {
                return (+(a.total) > +(b.total)) ? -1 : ((+(b.total) > +(a.total)) ? 1 : 0);
            });
        };

        resultFactory.getParsedResults = function (gameId) {
            return resultFactory.getGameResults(gameId)
                .then(resultFactory.parseTeamsResult)
                .then((res) => {
                    return resultFactory.setTeamName(res, gameId)
                })
                .then(resultFactory.sortDesc);
        };

        resultFactory.getGameWinner = function (gameId) {
            return resultFactory.getParsedResults(gameId)
                .then((results) => {
                    return results[0];
                });
        };

        resultFactory.setGameWinner = function (status, gameId) {
            let ref;
            if (status === 'finished') {
                ref = finishedRef;
            }
            else if (status === 'current') {
                ref = currentRef;
            }

            return resultFactory.getGameWinner(gameId)
                .then((res) => {
                    let winner = {};
                    winner['id'] = res.teamId;
                    winner['name'] = res.teamName;
                    winner['score'] = res.total;
                    return ref.child(gameId).child('winner').set(winner);
                });
        };

            return resultFactory;
        }]
    );