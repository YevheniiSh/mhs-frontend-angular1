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
                getParsedSeasonResults: getParsedSeasonResults,
                openSeason: openSeason,
                finishSeason: finishSeason,
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

            function getCurrentSeason() {
               return new $firebaseArray(seasonRef.orderByChild("current").equalTo(true))
                    .$loaded()
                    .then((seasons)=>{
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

                        for (let key in results) {
                            results[key].games = {};
                            games.forEach((item) => {
                                results[key].games[item.$id] = {rating: 0, gameId: item.$id};
                            });
                        }
                        console.log('Test');

                        console.log(parsedResults);

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

                        for (let key in results) {
                            parsedResults.push(results[key]);
                        }

                        console.log(parsedResults);
                        return parsedResults;
                    })
                    .then(sortParsedResults);
            }

            function sortParsedResults(score) {
                return score.sort((a, b) => {
                    return (+(a.total) > +(b.total)) ? -1 : ((+(b.total) > +(a.total)) ? 1 : 0);
                });
            }

            function setStatus(id, status) {
                let seasonStatus = new $firebaseObject(seasonRef.child(`seasons/${id}/status`));
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
                return setStatus(id, false);
            }
        }]);