angular.module('seasonService')
    .factory('seasonService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let seasonRef = firebaseDataService.seasons;

            return {
                save: save,
                getSeasonsNames: getSeasonsNames,
                getSeasonIdByGameId: getSeasonIdByGameId,
                setTeamsRatingForGame: setTeamsRatingForGame
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
                            let obj = new $firebaseObject(seasonRef.child(`${seasonId}/games/${gameId}/teams/${teamId}/rating`));
                            obj.$value = rating;
                            obj.$save();
                            return obj.$loaded();
                        }
                    })

            }
        }]);