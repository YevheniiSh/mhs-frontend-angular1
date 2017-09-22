angular.module('gameTemplate')
    .component('currentGameTemplate', {
      templateUrl: 'app/admin/game-template/current-game-template.html',
      css: 'app/admin/game-template/current-game-template.css',
        controller: currentGameTemplate,
      bindings: {
        selectedTemplateId: '='
      }
    });

currentGameTemplate.$inject = ['$routeParams', 'gameTemplateServiceFactory', '$timeout'];

function currentGameTemplate($routeParams, templateService, $timeout) {
    let vm = this;
    vm.selected = false;

    vm.$onInit = onInit;

    function onInit() {
        vm.templateId = $routeParams.templateId;
        templateService.getById(vm.templateId).then(template => {
            templateService.getRounds(vm.templateId)
              .then(rounds => {
                    vm.currentTemplateRounds = rounds;
                if (!template.rounds) vm.currentTemplateRounds = [];
                });
            vm.currentTemplateName = template.name;
        });
    }

    vm.saveTemplate = function () {
      if (vm.currentTemplateRounds.length < 2) {
        vm.roundCountError = true;
        $timeout(() => {
          vm.roundCountError = false;
        }, 2000)
      } else {
        templateService.update(vm.templateId, {name: vm.currentTemplateName, rounds: vm.currentTemplateRounds})
          .then(template => {
            vm.currentTemplateRounds = template.rounds.slice(1, template.rounds.length);
            vm.roundCountError = false;
            vm.templateSaved = true;
            $timeout(() => {
              vm.templateSaved = false;
            }, 2000)
          })
      }

    }
}
