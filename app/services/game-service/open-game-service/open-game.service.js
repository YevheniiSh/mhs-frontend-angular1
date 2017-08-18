(function () {
    angular
        .module('openGameService')
        .factory('OpenGameServiceFactory', OpenGameServiceFactory);

    OpenGameServiceFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService', 'convertServiceFactory'];

    function OpenGameServiceFactory($firebaseArray, $firebaseObject, firebaseDataService, convertService) {

        let openGamesRef = firebaseDataService.openGames;

        return {
            getAllOpenGames: getAllOpenGames,
            createNewGame: createNewGame,
            addTeams: addTeams,
            addRequest: addRequest,
            addRounds: addRounds,
            getRounds: getRounds,
            getTeams: getTeams,
            getOpenGameById: getOpenGameById
        };

        function getAllOpenGames() {
            return new $firebaseArray(openGamesRef).$loaded();
        }

        function getOpenGameById(gameId) {
            return new $firebaseObject(openGamesRef.child(gameId)).$loaded()
        }

        function createNewGame(game) {
            let obj = new $firebaseObject(openGamesRef.push());
            obj.$value = game;
            obj.$save();
            return obj.$loaded().then(() => {
                return obj.$id;
            });
        }

        // function convertAllForFirebase(game) {
        //     let rounds = {};
        //     for (let i = 0; i < game.rounds.length; i++) {
        //         rounds[game.rounds[i].id] = {
        //             numberOfQuestions: game.rounds[i].numberOfQuestions,
        //             name: game.rounds[i].name
        //         };
        //     }
        //     let teams = {};
        //     for (let i = 0; i < game.teams.length; i++) {
        //         teams[game.teams[i].id] = game.teams[i].name;
        //     }
        //     game.teams = teams;
        //     game.rounds = rounds;
        //     return game;
        // }


        // function saveGame(game, gameId) {
        //     let obj = new $firebaseObject(openGamesRef.child(gameId));
        //     game = convertAllForFirebase(game);
        //     obj.$value = game;
        //     obj.$save();
        //     return obj
        //         .$loaded()
        //         .then((res) => {
        //             return res.$id;
        //         }, (err) => {
        //             console.error(err);
        //             return err;
        //         });
        // }

        function addTeams(gameId, teams) {
            let obj = new $firebaseObject(openGamesRef.child(gameId).child('teams'));
            let team = convertService.convertTeamsForFirebase(teams);
            obj.$value = team;
            obj.$save();
            return obj.$loaded();
        }

        function addRequest(gameId, request) {
            let obj = new $firebaseObject(openGamesRef.child(gameId).child('requests').push());
            obj.$value = request;
            obj.$save();
            return obj.$loaded();
        }

        function addRounds(gameId, rounds) {
            let obj = new $firebaseObject(openGamesRef.child(gameId).child('rounds'));
            let round = convertService.convertRoundsForFirebase(rounds);
            obj.$value = round;
            obj.$save();
            return obj.$loaded();

        }

        function getRounds(gameId) {
            let obj = new $firebaseArray(openGamesRef.child(gameId).child('rounds'));
            return obj.$loaded();

        }

        function getTeams(gameId) {
            let obj = new $firebaseArray(openGamesRef.child(gameId).child('teams'));
            return obj.$loaded();
        }

    }
})();