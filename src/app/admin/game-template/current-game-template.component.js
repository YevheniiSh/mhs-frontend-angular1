angular.module('gameTemplate')
  .component('currentGameTemplate', {
    templateUrl: 'app/admin/game-template/current-game-template.html',
    css: 'app/admin/game-template/current-game-template.css',
    controller: currentGameTemplate,
    bindings: {
      template: '=',
      isNewTemplate: '=',
      selectedTemplate: '='
    }
  });

currentGameTemplate.$inject = ['gameTemplateServiceFactory', '$timeout', '$location'];

function currentGameTemplate(templateService, $timeout, $location) {
  let vm = this;
  vm.selected = false;

  vm.saveTemplate = function () {

    if (vm.template.rounds.length < 2) {
      showRoundCountError();
    } else if (vm.isNewTemplate) {
      vm.createTemplate();
    } else
      vm.updateTemplate();
  };

  vm.createTemplate = function () {
    templateService.save(vm.template.name, vm.template.rounds).then((res) => {
      vm.selectedTemplate = res.$id;
      vm.template.id = res.$id;
      vm.isNewTemplate = false;
      $location.path(`/templates/${ vm.template.id }`);
    });
  };

  vm.updateTemplate = function () {
    templateService.update(vm.template.id, {name: vm.template.name, rounds: vm.template.rounds})
      .then(() => {
        showTemplateSavedMessage();
      })
  };

  let showTemplateSavedMessage = function () {
    vm.templateSaved = true;
    $timeout(() => {
      vm.templateSaved = false;
    }, 2000)
  };

  let showRoundCountError = function () {
    vm.roundCountError = true;
    $timeout(() => {
      vm.roundCountError = false;
    }, 2000)
  };

}
