'use strict';
angular.module('gameTemplate')
  .component('gameTemplate', {
    templateUrl: 'app/admin/game-template/game-template.html',
    css: 'app/admin/game-template/game-template.css',
    controller: gameTemplate,

  });

gameTemplate.$inject = ['$routeParams', '$location', 'gameTemplateServiceFactory'];

function gameTemplate($routeParams, $location, templateService) {
  let vm = this;

  vm.$onInit = onInit;

  function onInit() {
    templateService.getAll().then((res) => {
      vm.templates = res;
    });

    if ($routeParams.hasOwnProperty("templateId")) {
      vm.templateId = $routeParams.templateId;
      getTemplate();
    }
  }

  vm.showTemplate = function (templateId) {
    vm.templateId = templateId;
    $location.path(`/templates/${templateId}`);
    getTemplate();
  };

  let getTemplate = function () {
    vm.template = {};
    templateService.getById(vm.templateId).then(template => {
      vm.template.name = template.name;
      vm.template.rounds = template.rounds.slice(1, template.rounds.length); // first round is undefined!
      vm.template.id = vm.templateId;
    });
  };

  vm.newTemplate = function () {
    vm.isNewTemplate = true;
    vm.template = {
      rounds: []
    };
  };

  vm.deleteTemplate = function (templateId) {
    templateService.remove(templateId);
    if ($routeParams.templateId === templateId) $location.path(`/templates`)
  };
}
