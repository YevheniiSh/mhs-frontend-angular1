angular
  .module('roundService')
  .factory('RoundStatusService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService', 'GameServiceFactory', function ($firebaseArray, $firebaseObject, firebaseDataService, gameService) {

    return {
      getRounds: getRounds,
      getRoundNames: getRoundNames,
      setQuizStatus: setQuizStatus
    };

    function getRounds(gameId) {
      return gameService.getGameRef(gameId)
        .then(ref => {
          let firebaseObj = new $firebaseArray(ref.child(`/${gameId}/rounds`));
          return firebaseObj.$loaded();
        })
    }

    function getRoundNames(gameId) {
      return gameService.getGameRef(gameId)
        .then((ref) => {
          let fbObj = new $firebaseArray(ref.child(gameId).child('rounds'));
          return fbObj.$loaded();
        });
    }

    function setQuizStatus(gameId, roundId, quizId, object) {
      return gameService.getGameRef(gameId)
        .then((ref) => {
          let fbObj = new $firebaseObject(ref.child(`${gameId}/rounds/${roundId}/quizzesWithWeight/${quizId}`));
          fbObj.$value = object;
          fbObj.$save();
          return fbObj.$loaded();
        });
    }
  }]);
