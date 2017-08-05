angular
    .module('resultService')
    .factory('ResultServiceFactory', ['firebaseDataService', 'GameServiceFactory', function (firebaseDataService, gameService) {

        let currentRef = firebaseDataService.currentGames;
        let finishedRef = firebaseDataService.finishedGames;


            let resultFactory = {};

            resultFactory.saveResult = function (result, gameId) {
                let resultKey = result.round + "_" + result.quiz + "_" + result.teamId;
                return currentRef.child(`${gameId}/results/${resultKey}`)
                    .set(result)
                    .then(() => {
                        return resultKey;
                    }, (err) => {
                        console.log(err);
                        return err;
                    });
            };

        resultFactory.filter = function (filter, gameId) {
            let ref = gameService.getGameRef(gameId);
            console.log(ref);
            return ref.then((res) => {
                return res.child(`/${gameId}/results`)
                    .orderByChild(filter.by).equalTo(filter.val)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            });
            };

        resultFactory.getGameResults = function (gameId) {
            let ref = gameService.getGameRef(gameId);

            return ref.then((res) => {
                console.log(res);
                return res.child(`/${gameId}/results`)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            })

            };

            resultFactory.getByRoundAndQuiz = function (roundId, quizId, gameId) {
                return currentRef.child(`/${gameId}/results/`)
                    .orderByKey().startAt(`${roundId}_${quizId}_`).endAt(`${roundId}_${quizId}_~`)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };

        resultFactory.parseTeamsResult = function (gameResults) {
            let res = [];
            for (let key in gameResults) {
                res.push(gameResults[key]);
            }
            let roundResult = {};
            res.forEach((quizResult) => {
                roundResult[quizResult.teamId] = {rounds: {}, total: 0};
            });
            res.forEach((quizResult) => {
                let roundScore = roundResult[quizResult.teamId].rounds[quizResult.round];
                roundResult[quizResult.teamId].rounds[quizResult.round] = roundScore + quizResult.score || quizResult.score;
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
                return (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0);
            });
        }

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
        }

        resultFactory.setGameWinner = function (gameId) {
            return resultFactory.getGameWinner(gameId)
                .then((res) => {
                    console.log(res);
                    let winner = {};
                    winner[res.teamId] = res.teamName;
                    return currentRef.child(gameId).child('winner').set(winner);
                });
        };

            return resultFactory;
        }]
    );