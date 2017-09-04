angular
    .module('roundTypeService')
    .factory('roundTypeService', [
        '$firebaseArray', 
        '$firebaseObject',
        'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {
            let roundTypeRef = firebaseDataService.roundTypes;
            
            return{
                getRoundTypes: getRoundTypes,
                getDefaultValuesByRoundId: getDefaultValuesByRoundId
            }
            
            function getRoundTypes() {
                let roundTypes = new $firebaseArray(roundTypeRef);
                return roundTypes.$loaded();
            }

            function getDefaultValuesByRoundId(roundId) {
                let obj = new $firebaseObject(roundTypeRef.child(roundId));
                return obj.$loaded();
            }
        }
    ])