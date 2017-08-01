angular
    .module('roundStatus')
    .factory('RoundStatusService', ['dbConnection', '$q', function (firebaseConnection, $q) {
        let gameRef = firebaseConnection.ref().child('games');
        return {
            getRounds: function (gameId) {
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
            },
            getCurrentRound: function (gameId) {
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
        }
    }]);