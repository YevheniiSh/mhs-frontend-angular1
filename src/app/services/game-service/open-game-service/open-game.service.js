(function () {
    angular
        .module('openGameService')
        .factory('OpenGameServiceFactory', OpenGameServiceFactory);

    OpenGameServiceFactory.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService', 'convertServiceFactory'];

    function OpenGameServiceFactory($firebaseArray, $firebaseObject, firebaseDataService, convertService) {

        let openGamesRef = firebaseDataService.openGames;
        let seasonsRef = firebaseDataService.seasons;

        return {
            getAllOpenGames: getAllOpenGames,
            createNewGame: createNewGame,
            addTeams: addTeams,
            addRequest: addRequest,
            addRounds: addRounds,
            getDate: getDate,
            getTime: getTime,
            getLocation: getLocation,
            changeDate: changeDate,
            changeLocation: changeLocation,
            changeTime: changeTime,
          changeIsPrivate: changeIsPrivate,
            getRounds: getRounds,
            getTeams: getTeams,
            updateTeamSize: updateTeamSize,
            getOpenGameById: getOpenGameById,
            removeOpenGame: removeOpenGame,
            getTemplateName:getTemplateName,
          setTemplateName: setTemplateName,
          getSeason: getSeason,
          changeSeason: changeSeason,
          deleteSeason: deleteSeason
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

        function getDate(gameId) {
            return new $firebaseObject(openGamesRef.child(gameId).child('date'))
                .$loaded().then((res) => {
                    return res.$value
                })
        }

        function getTime(gameId) {
            let obj = new $firebaseObject(openGamesRef.child(gameId + '/time'));
            return obj.$loaded().then((res) => {
                let time;
                time = convertService.convertTimeFromFirebase(res.$value)
                return time
            });

        }

        function getLocation(gameId) {
            let obj = new $firebaseObject(openGamesRef.child(gameId + '/location'));
            return obj.$loaded().then((res) => {
                return res.$value
            })
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

        function updateTeamSize(gameId, teamId, numberOfPlayers) {
            let teamSize = new $firebaseObject(openGamesRef.child(`${gameId}/teams/${teamId}/teamSize`));
            teamSize.$value = numberOfPlayers;
            teamSize.$save();
            return teamSize.$loaded();
        }

        function setTemplateName(gameId, templateName) {
            let gameTemplateName = new $firebaseObject(openGamesRef.child(`${gameId}/templateName`));
            gameTemplateName.$value = templateName;
            gameTemplateName.$save();
            return gameTemplateName.$loaded();
        }

        function getTemplateName(gameId) {
           return new $firebaseObject(openGamesRef.child(`${gameId}/templateName`))
               .$loaded().then(res => {
                   return res.$value
               });
        }

        function removeOpenGame(gameId) {
            new $firebaseObject(openGamesRef.child(`${gameId}/season/id`))
                .$loaded()
                .then((res) => {

                    function removeFromOpenGameNode() {
                        openGamesRef.child(`${gameId}`).remove();
                    }

                    if (res.$value === null) {
                        removeFromOpenGameNode();
                    } else {
                        removeFromOpenGameNode();
                        seasonsRef.child(`${res.$value}/games/${gameId}`).remove();
                    }
                })
        }

      function getSeason(gameId) {
        return new $firebaseObject(openGamesRef.child(`${gameId}/season`)).$loaded()
          .then((season) => {
            return season.id;
          });
      }

      function changeSeason(gameId, season) {
        let obj = new $firebaseObject(openGamesRef.child(`${gameId}/season`));
        obj.$value = season
        obj.$save();
        return obj.$loaded();
      }

      function deleteSeason(gameId) {
        let obj = new $firebaseObject(openGamesRef.child(`${gameId}/season`));
        obj.$remove();
        return obj.$loaded();
      }

      function changeIsPrivate(gameId, isPrivate) {
        let obj = new $firebaseObject(openGamesRef.child(`${gameId}/isPrivate`));
        obj.$value = isPrivate;
        obj.$save();
        return obj.$loaded();
      }
    }
})();
