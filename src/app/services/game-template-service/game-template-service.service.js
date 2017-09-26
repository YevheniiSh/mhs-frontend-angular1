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
                getRounds:getRounds,
                getTemplateName:getTemplateName,
                createTemplate: createTemplate

            };


            function save(name, rounds) {
                let fbObj = new $firebaseObject(gameTemplatesRef.push());
                fbObj.$value = convertService.buildTemplateForFirebase({name: name, rounds: rounds});
                fbObj.$save();

            }

          function createTemplate(template) {
            return getAll().then((templates) => {
              if (hasUniqueName(template, templates)) {
                let fbObj = new $firebaseObject(gameTemplatesRef.push());
                fbObj.$value = convertService.buildTemplateForFirebase(template);
                fbObj.$save();
                return fbObj.$loaded();
              } else
                return false
            });
            }

            function update(templateId, template) {

              return getTemplateName(templateId).then((name) => {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(templateId));
                fbObj.$value = convertService.buildTemplateForFirebase(template);
                if (template.name === name) {
                  fbObj.$save();
                  return fbObj.$loaded();
                }
                else {
                  return getAll().then((templates) => {
                    if (hasUniqueName(template, templates)) {

                      fbObj.$save();
                      return fbObj.$loaded();
                    } else
                      return false
                  });
                }
              });
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
              return openGameService.getRounds(gameId)
                    .then((res) => {
                      return createTemplate({name: name, rounds: res});
                    })
            }

            function getRounds(templateId) {
                let obj = new $firebaseArray(gameTemplatesRef.child(templateId).child('rounds'));
                return obj.$loaded();

            }

            function getTemplateName(templateId) {
                let fbObj = new $firebaseObject(gameTemplatesRef.child(templateId).child('name'));
                return fbObj.$loaded().then((res) => {
                    return res.$value;
                }, (err) => {
                    console.error(err);
                    return err;
                });
            }

          function hasUniqueName(template, templates) {
            let isTemplateNameUnique = true;
            templates.forEach(t => {
              if (t.name === template.name) {
                isTemplateNameUnique = false;
              }
            });
            return isTemplateNameUnique;
          }


        }]
    );
