angular
  .module('roundTypeService')
  .factory('roundTypeService', [
    '$firebaseArray',
    '$firebaseObject',
    'firebaseDataService',
    function ($firebaseArray, $firebaseObject, firebaseDataService) {
      let roundTypeRef = firebaseDataService.roundTypes;

      return {
        getRoundTypes: getRoundTypes,
        getDefaultValuesByRoundId: getDefaultValuesByRoundId,
        copyRoundTypeToRound: copyRoundTypeToRound
      };

      function getRoundTypes() {
        return new $firebaseArray(roundTypeRef)
          .$loaded();
      }

      function getDefaultValuesByRoundId(roundId) {
        let obj = new $firebaseObject(roundTypeRef.child(roundId));
        return obj.$loaded();
      }

      function copyRoundTypeToRound(gameId, roundId, roundType) {
        let roundRef = firebaseDataService.openGames
          .child(`/${gameId}/rounds/${roundId}/roundType`);
        let obj = new $firebaseObject(roundRef);
        obj.$value = roundType;
        obj.$save();
        return obj
          .$loaded()
          .then((res) => {
            return res;
          }, (err) => {
            return err;
          });
      }
    }
  ]);
