angular
    .module('roundService')
    .factory('RoundStatusService', ['dbConnection', '$q', function (firebaseConnection, $q) {
        let gameRef = firebaseConnection.ref().child('games');
        return {
            getRounds: getRounds,
            getCurrentRound: getCurrentRound
        };


        function getCurrentRound(gameId) {
            let deferred = $q.defer();
            gameRef
                .child(`/${gameId}/currentRound`)
                .once('value')
                .then((res) => {
                    deferred.resolve(res.val())
                }, (err) => {
                    deferred.reject(err)
                });
            return deferred.promise;
        }

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