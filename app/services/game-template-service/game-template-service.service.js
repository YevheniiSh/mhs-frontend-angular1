angular.module('gameTemplateService')
    .factory('gameTemplateServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let gameTemplatesRef = firebaseDataService.gameTemplates;


            return {
                save: save,
                getAll: getAll,
                getById: getById,
                remove: remove
            }


            function save(template) {
                let fbObj = new $firebaseObject(gameTemplatesRef.push());
                fbObj.$value = template;
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