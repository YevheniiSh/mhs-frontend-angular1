angular
    .module('roundService')
    .factory('RoundStatusService', ['firebaseDataService', '$q', function (firebaseDataService, $q) {
        let gameRef = firebaseDataService.games;
        return {
            getRounds: getRounds,
        };

        function getRounds(gameId) {
            let deferred = $q.defer();
            gameRef
                .child(`/${gameId}/rounds`)
                .once('value')
                .then((res) => {
                    deferred.resolve(res.val());
                }, (err) => {
                    deferred.reject(err);
                });
            return deferred.promise;
        }
    }]);