(function () {
    angular
        .module('openGameService')
        .factory('OpenGameServiceFactory', OpenGameServiceFactory);

    OpenGameServiceFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService'];

    function OpenGameServiceFactory($firebaseArray, $firebaseObject, firebaseDataService) {

        let openGamesRef = firebaseDataService.openGames;

        return {
            getAllOpenGames: getAllOpenGames,
            createNewGame: createNewGame
        };

        function getAllOpenGames() {
            return new $firebaseArray(openGamesRef).$loaded();
        }

        function createNewGame(game) {
            let obj = new $firebaseObject(openGamesRef.push());
            obj.$value = game;
            obj.$save();
            return obj.$loaded();
        }
    }
})();