angular.module('seasonService')
    .factory('seasonService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let seasonRef = firebaseDataService.seasons;

            return {
                save: save,
                getSeasonsNames: getSeasonsNames,
                getSeasonIdByGameId: getSeasonIdByGameId,
                setTeamsRatingForGame: setTeamsRatingForGame,
                addGameToSeason: addGameToSeason,
                getSeasonGames: getSeasonGames,
                getContenderTeams: getContenderTeams,
                getDropOutTeams: getDropOutTeams,
                getParsedSeasonResults: getParsedSeasonResults
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

            function getSeasonsNames() {
                return new $firebaseArray(seasonRef)
                    .$loaded()
                    .then((res) => {
                        let seasons = [];
                        res.forEach(season => {
                            seasons.push({id: season.$id, name: season.name})
                        })
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
                obj.$value = true;
                obj.$save();
                return obj.$loaded();
            }

            function getSeasonGames(seasonId) {
                let obj = new $firebaseArray(seasonRef.child(`${seasonId}/games/`));
                return obj.$loaded()
                    .then((res) => {
                        let ids = [];
                        res.forEach((item) => {
                            ids.push(item);
                        });
                        return ids;
                    });

            }

            function getNumberOfGames(seasonId) {
                let obj = new $firebaseArray(seasonRef.child(`${seasonId}/games/`));
                return obj.$loaded()
                    .then((res) => {
                        return res.length;
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
                                results[key].games[item.$id] = {rating: item.teams[key].rating, gameId: item.$id};
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
                        numberOfGames = length
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
                    .then(sortParsedResults);
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
                                    results[key].games[item.$id] = {rating: 0, gameId: item.$id};
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
                        })

                        return parsedResults;
                    })
                    .then(sortParsedResults);
                ;
            }

            function sortParsedResults(score) {
                return score.sort((a, b) => {
                    return (+(a.total) > +(b.total)) ? -1 : ((+(b.total) > +(a.total)) ? 1 : 0);
                });
            }
        }]);