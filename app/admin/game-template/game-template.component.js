'use strict';
angular.module('gameTemplate')
    .component('gameTemplate', {
        templateUrl: 'admin/game-template/game-template.html',
        css: 'admin/game-template/game-template.css',
        controller: gameTemplate,
        bindings: {
            selectedTemplateId: '='
        }
    });

gameTemplate.$inject = ['$routeParams', '$location', 'gameTemplateServiceFactory'];

function gameTemplate($routeParams, $location, templateService) {
    let vm = this;

    vm.selected = false;

    templateService.getAll().then((val) => {
        vm.templates = val
    });

    vm.showTemplate = function (templateId) {
        $location.path(`/templates/${templateId}`);
    };

    vm.newTemplate = function () {
        templateService.createTemplate().then((res) => {
            $location.path(`/templates/${res.$id}`);
        })
    };

    vm.deleteTemplate = function (templateId) {
        templateService.remove(templateId);
        if ($routeParams.templateId === templateId) $location.path(`/templates`)
    };
}