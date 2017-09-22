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

    vm.selected = false;
  vm.selectedTemplated = $routeParams.templateId;
    templateService.getAll().then((val) => {
        vm.templates = val
    });

    vm.showTemplate = function (templateId) {
      vm.selectedTemplated = templateId;
        $location.path(`/templates/${templateId}`);
    };

    vm.newTemplate = function () {
      vm.ne
    };

    vm.deleteTemplate = function (templateId) {
        templateService.remove(templateId);
        if ($routeParams.templateId === templateId) $location.path(`/templates`)
    };
}
