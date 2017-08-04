angular
    .module('roundService')
    .factory('RoundStatusService', ['$firebaseArray', 'firebaseDataService', '$q', 'GameServiceFactory', function ($firebaseArray, firebaseDataService, $q, gameService) {
        let currentGameRef = firebaseDataService.currentGames;
        let finishedGameRef = firebaseDataService.finishedGames;

        return {
            getRounds: getRounds,
            getRoundNames: getRoundNames
        };

        function getRounds(gameId) {
            let deferred = $q.defer();
            currentGameRef
                .child(`/${gameId}/rounds`)
                .once('value')
                .then((res) => {
                    deferred.resolve(res.val());
                }, (err) => {
                    deferred.reject(err);
                });
            return deferred.promise;
        }

        function getRoundNames(gameId) {
            return gameService.getGameRef(gameId)
                .then((ref) => {
                    let fbObj = new $firebaseArray(ref.child(gameId).child('rounds'));
                    return fbObj.$loaded();
                });
        }
    }]);