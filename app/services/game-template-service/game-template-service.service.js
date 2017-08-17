angular.module('gameTemplateService')
    .factory('gameTemplateServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let openGameRef = firebaseDataService.openGames;


            return {
                save: save
            }


            function save() {

            }

        }]
    );