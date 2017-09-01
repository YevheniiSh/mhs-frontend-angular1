angular.module('seasonStatusService')
    .factory('seasonStatusService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let seasonRef = firebaseDataService.seasons;

            return{
                openSeason: openSeason,
                finishSeason: finishSeason,
            };

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