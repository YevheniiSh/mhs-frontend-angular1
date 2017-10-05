angular.module('seasonService')
    .factory('seasonService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let seasonRef = firebaseDataService.seasons;

            return {
                save: save,
                getSeasonsNames: getSeasonsNames,
                getCurrentSeason: getCurrentSeason,
                getSeasonIdByGameId: getSeasonIdByGameId,
                setTeamsRatingForGame: setTeamsRatingForGame,
                addGameToSeason: addGameToSeason,
                getSeasonGames: getSeasonGames,
                getContenderTeams: getContenderTeams,
                getDropOutTeams: getDropOutTeams,
                getParsedSeasonResults: getParsedSeasonResults,
                openSeason: openSeason,
                finishSeason: finishSeason,
                finishGame: finishGame,
                getSeasons: getSeasons,
                getNumberOfGames: getNumberOfGames,
                getSeasonWinners: getSeasonWinners,
              hasOpenGames: hasOpenGames,
              deleteGameFromSeason: deleteGameFromSeason
            };

            function save(season) {
                let obj = new $firebaseObject(seasonRef.push());
                obj.$value = season;
                obj.$save();
                return obj
                    .$loaded()
                    .then((res) => {
                        return res.$id;
                    }, (err) => {
                        return err;
                    });
            }

            function getSeasons() {
                return new $firebaseArray(seasonRef)
                    .$loaded();
            }

            function getCurrentSeason() {
                return new $firebaseArray(seasonRef.orderByChild("current").equalTo(true))
                    .$loaded()
                    .then((seasons) => {
                        return seasons[0];
                    });
            }

            function getSeasonsNames() {
                return new $firebaseArray(seasonRef)
                    .$loaded()
                    .then((res) => {
                        let seasons = [];
                        res.forEach(season => {
                            seasons.push({id: season.$id, name: season.name})
                        });
                        return seasons;
                    }, (err) => {
                        return err;
                    });
            }

            function getSeasonIdByGameId(gameId) {
                let obj = new $firebaseArray(seasonRef);
                return obj.$loaded()
                    .then((res) => {
                        let id = undefined;
                        res.forEach((item) => {
                            if (item.games !== undefined)
                                if (item.games.hasOwnProperty(gameId)) {
                                    id = item.$id;
                                }
                        });
                        return id;
                    })

            }

            function setTeamsRatingForGame(gameId, teamId, position) {
                return getSeasonIdByGameId(gameId)
                    .then((seasonId) => {
                        if (seasonId !== undefined) {
                            let obj = new $firebaseObject(seasonRef.child(`${seasonId}/games/${gameId}/teams/${teamId}`));
                            let rating = {};

                            rating.teamName = position.teamName;

                            switch (position.rating) {
                                case 1:
                                    rating.rating = 12;
                                    break;
                                case 2:
                                    rating.rating = 10;
                                    break;
                                default:
                                    rating.rating = 11 - position.rating;
                            }

                            if (rating.rating < 0) {
                                rating.rating = 0;
                            }

                            obj.$value = rating;
                            obj.$save();
                            return obj.$loaded();
                        }
                    })

            }

            function addGameToSeason(seasonId, gameId) {
                let obj = new $firebaseObject(seasonRef.child(`${seasonId}/games/${gameId}`));
                obj.$value = {finished: false};
                obj.$save();
                return obj.$loaded();
            }

            function getSeasonGames(seasonId) {
                let obj = new $firebaseArray(seasonRef.child(`${seasonId}/games/`));
                return obj.$loaded()
                    .then((res) => {
                        let ids = [];
                        res.forEach((item) => {
                            if (item.finished === true)
                                ids.push(item);
                        });
                        return ids;
                    });

            }

            function getNumberOfGames(seasonId) {
                let obj = new $firebaseArray(seasonRef.child(`${seasonId}/games/`));
                return obj.$loaded()
                    .then((res) => {
                        let gamesNumber = 0;
                        for (let game in res) {
                            if (res[game].finished === true)
                                gamesNumber++;
                        }
                        return gamesNumber;
                    })
            }

            function getParsedSeasonResults(seasonId) {
                let results = {};

                return getSeasonGames(seasonId)
                    .then((games) => {

                        games.forEach((item) => {
                            for (let key in item.teams) {
                                results[key] = {};
                                results[key].teamId = key;
                                results[key].teamName = item.teams[key].teamName;
                            }
                        });

                        for (let key in results) {
                            results[key].games = {};
                        }

                        games.forEach((item) => {
                            for (let key in item.teams) {
                                results[key].games[item.$id] = {
                                    rating: item.teams[key].rating,
                                    gameId: item.$id,
                                    played: true
                                };
                            }
                        });

                        for (let key in results) {
                            results[key].total = 0;

                            for (let gameKey in results[key].games) {
                                results[key].total += results[key].games[gameKey].rating;
                            }
                        }
                        results.games = games;

                        return results;
                    });
            }

            function getContenderTeams(seasonId) {
                let numberOfGames = 0;
                let parsedResults = [];

                return getNumberOfGames(seasonId)
                    .then(length => {
                        numberOfGames = length;
                        return getParsedSeasonResults(seasonId)
                    })
                    .then((results) => {
                        delete results['games'];

                        for (let key in results) {
                            if (Object.keys(results[key].games).length !== numberOfGames) {
                                delete results[key];
                            }
                        }

                        for (let key in results) {
                            parsedResults.push(results[key]);
                        }

                        return parsedResults;
                    })
                    .then(sortParsedResults)
                    .then(setTeamsPosition);
            }

            function getDropOutTeams(seasonId) {
                let numberOfGames = 0;
                let parsedResults = [];

                return getNumberOfGames(seasonId)
                    .then(length => {
                        numberOfGames = length
                        return getParsedSeasonResults(seasonId)
                    })
                    .then((results) => {

                        let games = results.games;
                        delete results['games'];

                        for (let key in results) {
                            if (Object.keys(results[key].games).length === numberOfGames) {
                                delete results[key];
                            }
                        }

                        for (let key in results) {
                            games.forEach((item) => {
                                if (results[key].games[item.$id] === undefined) {
                                    results[key].games[item.$id] = {rating: 0, gameId: item.$id, played: false};
                                }
                            });
                        }

                        for (let key in results) {
                            parsedResults.push(results[key]);
                        }

                        parsedResults.forEach(item => {
                            item.gamesArr = [];
                            for (let key in item.games) {
                                item.gamesArr.push(item.games[key]);
                            }
                        });

                        return parsedResults;
                    })
                    .then(sortGamesArray)
                    .then(sortParsedResults)
                    .then(setTeamsPosition);
            }

            function sortGamesArray(arr) {
                console.log(arr);
                arr.forEach((item) => {
                    item.gamesArr.sort((a, b) => {
                        return ((a.gameId > b.gameId) ? 1 : (b.gameId > a.gameId) ? -1 : 0);
                    })
                });
                return arr;
            }


            function sortParsedResults(score) {
                return score.sort((a, b) => {
                    return (+(a.total) > +(b.total)) ? -1 : ((+(b.total) > +(a.total)) ? 1 : 0);
                });
            }

            function setStatus(id, status) {
                let seasonStatus = new $firebaseObject(seasonRef.child(`${id}/current`));
                seasonStatus.$value = status;
                return seasonStatus.$save()
                    .then((res) => {
                        return res.$value;
                    });
            }

            function openSeason(id) {
                return setStatus(id, true);
            }

            function finishSeason(id) {
                setSeasonWinners(id);
                return setStatus(id, false);
            }

            function finishGame(gameId) {
                getSeasonIdByGameId(gameId).then((seasonId) => {
                    if (seasonId !== undefined) {
                        let game = new $firebaseObject(seasonRef.child(`${seasonId}/games/${gameId}`));
                        game.$loaded().then(() => {
                            game.finished = true;
                            game.$save()
                        });
                    }
                })


            }

            function setTeamsPosition(score) {
                let positionTeam = 1;
                score.forEach((item, index) => {
                    if (score[index - 1]) {
                        if (score[index - 1].total != item.total) {
                            positionTeam++;
                        }
                    }
                    item.positionTeam = positionTeam;
                });
                console.log(score);
                return score;
            }

            function setSeasonWinners(seasonId) {
                return getContenderTeams(seasonId)
                    .then((results) => {
                        results.forEach((item) => {
                            if (item.positionTeam === 1) {
                                let obj = new $firebaseObject(seasonRef.child(`${seasonId}/winners/${item.teamId}`));
                                obj.$value = {teamName: item.teamName};
                                obj.$save();
                            }
                        })
                    })
            }

            function getSeasonWinners(seasonId) {
                let obj = new $firebaseArray(seasonRef.child(`${seasonId}/winners`));
                return obj.$loaded();
            }

            function hasOpenGames(seasonId) {
                let game = new $firebaseArray(seasonRef.child(`${seasonId}/games`));
                return game.$loaded().then((games) => {
                    let hasOpenGames = false;
                    for (let game in games) {
                        if (games[game].finished === false) {
                            hasOpenGames = true;
                            break
                        }
                    }
                    return hasOpenGames
                })

            }

          function deleteGameFromSeason(seasonId, gameId) {
            let game = new $firebaseObject(seasonRef.child(`${seasonId}/games/${gameId}`));
            game.$remove();
            return game.$loaded();
          }
        }]);
