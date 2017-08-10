(function () {
    angular
        .module('openGameService')
        .factory('OpenGameServiceFactory', OpenGameServiceFactory);

    OpenGameServiceFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService'];

    function OpenGameServiceFactory($firebaseArray, $firebaseObject, firebaseDataService) {

        let openGamesRef = firebaseDataService.openGames;

        return {
            getAllOpenGames: getAllOpenGames
        };

        function getAllOpenGames() {
            return new $firebaseArray(openGamesRef).$loaded();
        }
    }
})();