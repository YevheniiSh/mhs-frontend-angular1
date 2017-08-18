angular.module('gameTemplateService')
    .factory('gameTemplateServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService', 'convertServiceFactory',
        function ($firebaseArray, $firebaseObject, firebaseDataService, convertService) {

            let gameTemplatesRef = firebaseDataService.gameTemplates;


            return {
                save: save,
                getAll: getAll,
                getById: getById,
                remove: remove,
                updateName: updateName,
                updateRounds: updateRounds
            };


            function save(name, rounds) {
                let fbObj = new $firebaseObject(gameTemplatesRef.push());
                fbObj.$value = convertService.buildTemplateForFirebase(name, rounds);
                fbObj.$save();
                return fbObj.$loaded();
            }

            function updateName(templateId, name) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(`${templateId}/name`));
                fbObj.$value = name;
                fbObj.$save();
                return fbObj.$loaded();
            }

            function updateRounds(templateId, rounds) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(`${templateId}/rounds`));
                fbObj.$value = convertService.convertRoundsForFirebase(rounds);
                fbObj.$save();
                return fbObj.$loaded();
            }

            function getAll() {
                let fbObj = new $firebaseArray(gameTemplatesRef);
                return fbObj.$loaded();
            }

            function getById(templateId) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(templateId));
                return fbObj.$loaded();
            }

            function remove(templateId) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(templateId));
                fbObj.$remove();
                return fbObj.$loaded();
            }

        }]
    );