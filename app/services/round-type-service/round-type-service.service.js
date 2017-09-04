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
                return new $firebaseArray(roundTypeRef)
                    .$loaded();
            }

            function getDefaultValuesByRoundId(roundId) {
                let obj = new $firebaseObject(roundTypeRef.child(roundId));
                return obj.$loaded();
            }
        }
    ])