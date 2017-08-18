angular
    .module('roundService')
    .factory('RoundStatusService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService', 'GameServiceFactory', function ($firebaseArray, $firebaseObject, firebaseDataService, gameService) {
        let currentGameRef = firebaseDataService.currentGames;
        let finishedGameRef = firebaseDataService.finishedGames;

        return {
            getRounds: getRounds,
            getRoundNames: getRoundNames
        };

        function getRounds(gameId) {
            let firebaseObj = new $firebaseArray(currentGameRef.child(`/${gameId}/rounds`));
            return firebaseObj.$loaded();
        }

        function getRoundNames(gameId) {
            return gameService.getGameRef(gameId)
                .then((ref) => {
                    let fbObj = new $firebaseArray(ref.child(gameId).child('rounds'));
                    return fbObj.$loaded();
                });
        }
    }]);