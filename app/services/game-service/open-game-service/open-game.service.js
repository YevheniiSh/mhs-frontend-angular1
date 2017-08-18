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
            changeDate: changeDate,
            changeLocation: changeLocation,
            changeTime: changeTime,
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

        function changeDate(gameId, date) {
            let obj = new $firebaseObject(openGamesRef.child(`${gameId}/date`));
            obj.$value = convertService.convertDate(date);
            obj.$save();
            return obj.$loaded();
        }

        function changeLocation(gameId, location) {
            let obj = new $firebaseObject(openGamesRef.child(`${gameId}/location`));
            obj.$value = location;
            obj.$save();
            return obj.$loaded();
        }

        function changeTime(gameId, time) {
            let obj = new $firebaseObject(openGamesRef.child(`${gameId}/time`));
            obj.$value = convertService.convertTime(time);
            obj.$save();
            return obj.$loaded();
        }

        function convertTeamsForFirebase(teams) {
            let team = {};
            for (let i = 0; i < teams.length; i++) {
                team[teams[i].id] = teams[i].name;
            }
            return team;
        }

        function convertRoundsForFirebase(rounds) {
            let convertedRounds = {};
            for (let i = 0; i < rounds.length; i++) {
                convertedRounds[rounds[i].$id] = {
                    numberOfQuestions: rounds[i].numberOfQuestions,
                    name: rounds[i].name
                };
            }
            return convertedRounds
        }

        function addTeams(gameId, teams) {
            let obj = new $firebaseObject(openGamesRef.child(gameId).child('teams'));
            let team = convertTeamsForFirebase(teams);
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
            let round = convertRoundsForFirebase(rounds);
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