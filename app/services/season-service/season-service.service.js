angular.module('seasonService')
    .factory('seasonService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {
            return {
                getSeasonsNames: getSeasonsNames
            };

            function getSeasonsNames() {
                return new $firebaseArray(firebaseDataService.seasons)
                    .$loaded()
                    .then((res) => {
                        let seasons=[];
                        res.forEach(season=>{
                            seasons.push({id:season.$id,name:season.name})
                        })
                        return seasons;
                    }, (err) => {
                        return err;
                    });
            }
        }]);