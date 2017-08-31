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

            function setTeamsRatingForGame(gameId, teamId, rating) {
                return getSeasonIdByGameId(gameId)
                    .then((seasonId) => {
                        if (seasonId !== undefined) {
                            let obj = new $firebaseObject(seasonRef.child(`${seasonId}/games/${gameId}/teams/${teamId}`));
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

            function getParsedSeasonResults(seasonId) {
                let results = {};
                let parsedResults = [];

                return getSeasonGames(seasonId)
                    .then((games) => {

                        games.forEach((item) => {
                            for (let key in item.teams) {
                                results[key] = {};
                                results[key].teamId = key;
                                results[key].teamName = item.teams[key].teamName;
                            }
                        });

                        games.forEach((item) => {
                            for (let key in item.teams) {
                                results[key].games = [];
                            }
                        });

                        games.forEach((item) => {
                            for (let key in item.teams) {
                                results[key].games.push({rating: item.teams[key].rating, gameId: item.$id});
                            }
                        });

                        for (let key in results) {
                            results[key].total = results[key].games.reduce((sum, current) => {
                                return sum + parseFloat(current.rating);
                            }, 0)
                        }

                        for (let key in results) {
                            parsedResults.push(results[key]);
                        }

                        return parsedResults;
                    });
            }
        }]);