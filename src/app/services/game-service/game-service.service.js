angular
  .module('gameFactory')
  .factory('GameServiceFactory', ['OpenGameServiceFactory', '$firebaseArray', '$firebaseObject', 'firebaseDataService', 'convertServiceFactory',
    function (openGameServiceFactory, $firebaseArray, $firebaseObject, firebaseDataService, convertService) {

      let currentGameRef = firebaseDataService.currentGames;
      let finishedGameRef = firebaseDataService.finishedGames;
      let openedGameRef = firebaseDataService.openGames;

      let ref;

      return {
        getGameById: getCurrentGameById,
        getCurrentRound: getCurrentRound,
        getCurrentQuiz: getCurrentQuiz,
        getGameTeams: getGameTeams,
        setCurrentRound: setCurrentRound,
        setCurrentQuiz: setCurrentQuiz,
        finishGame: finishGame,
        publishGame: publishGame,
        getGameRef: getGameRef,
        getAllCurrentGames: getAllCurrentGames,
        getAllFinishedGames: getAllFinishedGames,
        getGameStatus: getGameStatus,
        getDate: getDate,
        getPhotosUrl: getPhotosUrl,
        startGame: startGame,
        setPhotosLink: setPhotosLink,
        removeTeamFromGame: removeTeamFromGame,
        reOpenGame: reOpenGame,
        addTeamToGame: addTeamToGame,
        getGameTeamsNumber: getGameTeamsNumber,
        getRoundByGameAndId: getRoundByGameAndId
      };

      function startGame(gameId) {
        openGameServiceFactory.getOpenGameById(gameId).then((res) => {
          let obj = new $firebaseObject(currentGameRef.child(gameId));
          obj.$value = convertService.getSimpleObjectFromFirebaseObject(res);
          obj.$save();
          res.$remove();
        });
      }

      function addTeamToGame(gameId, team) {
        let resultObj = new $firebaseObject(openedGameRef.child(`${gameId}/teams/${team.key}`));
        resultObj.$value = {
          name: team.name,
          requestId: team.requestId,
          fullName: team.fullName,
          teamSize: team.teamSize,
          phone: team.phone
        };
        return resultObj.$save()
          .then(() => {
            return team.key;
          }, (err) => {
            return err;
          });
      }

      function removeTeamFromGame(gameId, teamId) {
        let obj = new $firebaseObject(openedGameRef.child(`${gameId}/teams/${teamId}`));
        obj.$remove();
        return obj.$loaded();
      }

      function reOpenGame(gameId) {
        getCurrentGameById(gameId).then((res) => {
          let obj = new $firebaseObject(openedGameRef.child(gameId));
          obj.$value = convertService.getSimpleObjectFromFirebaseObject(res);
          obj.$save();
          res.$remove();
        });
      }


      function getGameRef(gameId) {
        return getCurrentGameById(gameId)
          .then((res) => {
            if (res.$value !== null) {
              return ref = currentGameRef;

            }
            else {
              return ref = finishedGameRef;
            }
          })
          .catch(() => {
            return ref = finishedGameRef
          });
      }


      function getGameStatus(gameId) {
        return getCurrentGameById(gameId)
          .then((res) => {
            if (res.$value !== null) {
              return 'current';

            }
            else {
              return 'finished';
            }
          })
          .catch(() => {
            return 'finished';
          });
      }


      function getDate(gameStatus, gameId) {
        return new $firebaseObject(firebaseDataService.games.child(gameStatus).child(gameId).child('date')).$loaded();
      }

      function getCurrentGameById(gameId) {
        return new $firebaseObject(currentGameRef.child(gameId))
          .$loaded();
      }

      function getFinishedGameById(gameId) {
        return new $firebaseObject(finishedGameRef.child(gameId))
          .$loaded();
      }

      function getAllFinishedGames() {
        return new $firebaseArray(finishedGameRef)
          .$loaded();
      }

      function getAllCurrentGames() {
        return new $firebaseArray(currentGameRef)
          .$loaded();
      }

      function finishGame(gameId) {
        getCurrentGameById(gameId).then((res) => {
          let obj = new $firebaseObject(finishedGameRef.child(gameId));
          obj.$value = convertService.getSimpleObjectFromFirebaseObject(res);
          obj.$save();
          res.$remove();
        });
      }

      function getCurrentRound(gameId) {
        return getStatus(gameId, 'currentRound');
      }

      function getRoundByGameAndId(gameId, roundId) {
        return new $firebaseObject(
          currentGameRef
            .child(gameId)
            .child('rounds')
            .child(roundId)
        ).$loaded();
      }

      function getCurrentQuiz(gameId) {
        return getStatus(gameId, 'currentQuiz');
      }

      function getStatus(gameId, status) {
        return getGameRef(gameId)
          .then(ref => {
            let roundRef = ref
              .child(`${gameId}/${status}`);
            return new $firebaseObject(roundRef)
              .$loaded()
              .then((res) => {
                return res.$value;
              }, (err) => {
                console.error(err);
                return err;
              });
          })

      }

      function getPhotosUrl(gameId) {
        return new $firebaseObject(finishedGameRef.child(gameId).child('photos'))
          .$loaded().then((res) => {
            if (res.$value === null)
              return '';
            return res.$value
          });
      }

      function getGameTeams(gameId) {
        return getGameRef(gameId).then((ref) => {
          return $firebaseArray(ref.child(`/${gameId}/teams`))
            .$loaded()
            .then((res) => {
              return res.map((team) => {
                return {teamId: team.$id, name: team.name}
              });
            }, (err) => {
              console.error(err);
              return err;
            });
        });
      }

      function setCurrentRound(currentRound, gameId) {
        let obj = new $firebaseObject(currentGameRef.child(`${gameId}/currentRound`));
        obj.$value = currentRound;
        obj.$save();
        return obj
          .$loaded()
          .then((res) => {
            return res.$value;
          }, (err) => {
            console.error(err);
            return err;
          });
      }

      function setCurrentQuiz(currentQuiz, gameId) {
        let obj = new $firebaseObject(currentGameRef.child(`${gameId}/currentQuiz`));
        obj.$value = currentQuiz;
        obj.$save();
        return obj
          .$loaded()
          .then((res) => {
            return res.$value;
          }, (err) => {
            console.error(err);
            return err;
          });
      }

      function publishGame(gameId) {
        getCurrentGameById(gameId).then((res) => {
          let obj = new $firebaseObject(finishedGameRef.child(gameId));
          obj.$value = convertService.getSimpleObjectFromFirebaseObject(res);
          obj.$save();
        });
      }

      function setPhotosLink(gameId, link) {
        let obj = new $firebaseObject(finishedGameRef.child(`${gameId}/photos`));
        obj.$value = link;
        obj.$save();
        return obj.$loaded();
      }

      function getGameTeamsNumber(gameId) {
        let obj = new $firebaseArray(finishedGameRef.child(`${gameId}/teams`));
        return obj.$loaded()
          .then((res) => {
            return res.length;
          })
      }

    }]);
