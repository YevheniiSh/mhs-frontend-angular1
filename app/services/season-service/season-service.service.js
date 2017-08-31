angular.module('seasonService')
    .factory('seasonService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let seasonRef = firebaseDataService.seasons;

            return {
                save: save,
                getSeasonsNames: getSeasonsNames
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
        }]);