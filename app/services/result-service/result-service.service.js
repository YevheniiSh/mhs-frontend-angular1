angular
    .module('resultService')
    .factory('ResultServiceFactory', [
        '$firebaseArray',
        '$firebaseObject',
        'firebaseDataService',
        'GameServiceFactory',
        'TeamServiceFactory',
        'RoundStatusService',
        'seasonService',
        function ($firebaseArray, $firebaseObject, firebaseDataService, gameService, TeamService, roundService, seasonService) {

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
                resultObj.$save();
                return resultObj.$loaded();
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


            resultFactory.parseTeamsResult = function (gameResults, gameId) {
                let roundResult = {};
                let parsedResult = [];
                return gameService.getGameTeams(gameId)
                    .then(teams => {
                        teams.forEach(team => {
                            roundResult[team.teamId] = {
                                teamId: team.teamId,
                                teamName: team.name,
                                rounds: [],
                                total: 0
                            };
                        })
                    })
                    .then(() => {
                        return roundService.getRounds(gameId)
                    })
                    .then(() => {
                        return gameService.getCurrentRound(gameId)
                            .then((currentRound) => {
                                for (let team in roundResult) {
                                    for (let i = 0; i < currentRound - 1; i++) {
                                        roundResult[team].rounds.push({roundNumber: (i + 1), score: 0})
                                    }
                                }
                                gameResults.forEach(quizResult => {
                                    roundResult[quizResult.teamId].rounds[quizResult.round - 1].score += quizResult.score;
                                });
                                for (let team in roundResult) {
                                    for (let round in roundResult[team].rounds) {
                                        roundResult[team].rounds[round].score =
                                            roundResult[team].rounds[round].score.toFixed(1);
                                    }
                                }
                                for (let team in roundResult) {
                                    roundResult[team].total = roundResult[team].rounds.reduce((sum, current) => {
                                        return sum + parseFloat(current.score);
                                    }, 0).toFixed(1)
                                }
                                for (let team in roundResult) {
                                    parsedResult.push(roundResult[team]);
                                }
                                return parsedResult;
                            })
                    })
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

            function calculateTeamPosition(score) {
                let positionTeam = 1;
                score.forEach((item, index) => {
                    if (score[index - 1]) {
                        if (score[index - 1].total != item.total) {
                            positionTeam++;
                        }
                    }
                    item.positionTeam = positionTeam;
                });
                return score;
            }


            resultFactory.getParsedResults = function (gameId) {
                return resultFactory.getGameResults(gameId)
                    .then(res => {
                        return resultFactory.parseTeamsResult(res, gameId)
                    })
                    .then(resultFactory.sortDesc)
                    .then(calculateTeamPosition);
            };

            resultFactory.setTeamsResults = function (gameId) {
                return resultFactory.getParsedResults(gameId)
                    .then((res) => {
                        res.forEach((item) => {
                            TeamService.addGameScore(item.teamId, gameId, item.total);
                        });
                        return res;
                    });
            };

            resultFactory.setTeamPosition = function (gameId) {
                return resultFactory.getParsedResults(gameId)
                    .then(resultFactory.sortDesc)
                    .then(calculateTeamPosition)
                    .then((res) => {
                        res.forEach((item) => {
                            TeamService.saveTeamPosition(item.teamId, gameId, item.positionTeam);
                            seasonService.setTeamsRatingForGame(gameId, item.teamId, {
                                rating: (item.positionTeam),
                                teamName: item.teamName
                            });
                        });
                        return res;
                    });
            };

            resultFactory.getGameWinner = function (gameId) {
                return resultFactory.getParsedResults(gameId)
                    .then((results) => {
                        let winners = [];
                        results.forEach((item) => {
                            if (item.positionTeam === 1) {
                                winners.push(item);
                            }
                        });
                        return winners;
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

                return clearWinners(gameId, ref).then(() => {
                    resultFactory.getGameWinner(gameId)
                        .then((res) => {
                            res.forEach((item) => {
                                let obj = new $firebaseObject(ref.child(`${gameId}/winner/${item.teamId}`));
                                obj.$value = {name: item.teamName, score: item.total};
                                obj.$save();
                            });
                        });
                })
            };

            function clearWinners(gameId, ref) {
                let obj = new $firebaseObject(ref.child(`${gameId}/winner`));
                return obj.$remove()
            }

            resultFactory.isGameInFinishedSeason = function (gameId) {

                let isGameInFinishedSeason = false;

                return seasonService.getSeasonIdByGameId(gameId).then((seasonId) => {

                    if (seasonId === undefined) {
                        return isGameInFinishedSeason;
                    }

                    return seasonService.getCurrentSeason().then((currentSeason) => {
                        if (currentSeason !== undefined) {

                            if (seasonId !== currentSeason.$id)
                                isGameInFinishedSeason = true;
                        } else isGameInFinishedSeason = true;

                        return isGameInFinishedSeason;
                    })
                });
            };

            resultFactory.parseTeamResult = function (teamResults, gameId) {
                let roundResult = {};
                let parsedResult = [];
                return roundService.getRounds(gameId)
                    .then(rounds => {
                        return gameService.getCurrentRound(gameId)
                            .then((currentRound) => {
                                for (let i = 0; i < currentRound - 1; i++) {
                                    roundResult[i + 1] = {
                                        roundNum: i + 1,
                                        roundName: rounds[i].name,
                                        quizzes: [],
                                        roundType: rounds[i].roundType,
                                        total: 0
                                    };
                                    for (let j = 1; j <= rounds[i].numberOfQuestions; j++) {
                                        roundResult[i + 1].quizzes.push({quizNum: j, score: 0, real: false})
                                    }
                                }
                                teamResults.forEach(quizResult => {
                                    roundResult[quizResult.round].quizzes[quizResult.quiz - 1].score = quizResult.score;
                                    roundResult[quizResult.round].quizzes[quizResult.quiz - 1].real = true;
                                    if(quizResult.hasOwnProperty("weightOfResponse"))
                                        roundResult[quizResult.round].quizzes[quizResult.quiz - 1].weightOfResponse = quizResult.weightOfResponse;
                                });
                                for (let round in roundResult) {
                                    roundResult[round].total = roundResult[round].quizzes.reduce((sum, current) => {
                                        return sum + current.score;
                                    }, 0)
                                }
                                for (let round in roundResult) {
                                    parsedResult.push(roundResult[round]);
                                }
                                return parsedResult;
                            })
                    })
            };

            resultFactory.getQuiz = function (gameId, resId) {
                let ref = gameService.getGameRef(gameId);
                return ref.then((res) => {
                    let obj = $firebaseObject(res.child(`${gameId}/results/${resId}`));
                    return obj.$loaded();
                })
            };

            resultFactory.deleteResult = function (gameId, resId){
                let ref = gameService.getGameRef(gameId);
                return ref.then((res) => {
                    res.child(`${gameId}/results/${resId}`).remove();
                })
            }

            return resultFactory;
        }]
    );