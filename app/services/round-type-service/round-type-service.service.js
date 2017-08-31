angular
    .module('roundTypeService')
    .factory('roundTypeService', [
        '$firebaseArray', 
        '$firebaseObject',
        'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {
            let roundTypeRef = firebaseDataService.roundTypes;
            
            return{
                getRoundTypes:getRoundTypes
            }
            
            function getRoundTypes() {
                
            }
        }
    ])