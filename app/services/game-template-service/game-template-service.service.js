angular.module('gameTemplateService')
    .factory('gameTemplateServiceFactory', [
        '$firebaseArray',
        '$firebaseObject',
        'firebaseDataService',
        'convertServiceFactory',
        'OpenGameServiceFactory',
        function ($firebaseArray, $firebaseObject, firebaseDataService, convertService,openGameService) {

            let gameTemplatesRef = firebaseDataService.gameTemplates;


            return {
                save: save,
                getAll: getAll,
                getById: getById,
                remove: remove,
                update: update,
                updateName: updateName,
                updateRounds: updateRounds,
                saveFromGame:saveFromGame,
                addTemplateToGame:addTemplateToGame,
                getRounds:getRounds,
                getTemplateName:getTemplateName

            };


            function save(name, rounds) {
                let fbObj = new $firebaseObject(gameTemplatesRef.push());
                fbObj.$value = convertService.buildTemplateForFirebase(name, rounds);
                fbObj.$save();
                return fbObj.$loaded();
            }

            function update(templateId, template) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(templateId));
                fbObj.$value = convertService.buildTemplateForFirebase(template.name, template.rounds);
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

            function saveFromGame(gameId, name){
                openGameService.getRounds(gameId)
                    .then((res) => {
                        save(name, res);
                    })
            }

            function addTemplateToGame(template,gameId) {
                openGameService.addRounds(gameId,template.rounds)
            }

            function getRounds(templateId) {
                let obj = new $firebaseArray(gameTemplatesRef.child(templateId).child('rounds'));
                return obj.$loaded();

            }

            function getTemplateName(templateId) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(templateId).child('name'));
                return fbObj.$loaded() .then((res) => {
                    return res.$value;
                }, (err) => {
                    console.error(err);
                    return err;
                });
            }


        }]
    );