'use strict';
angular.module('gameTemplate')
    .component('gameTemplate', {
        templateUrl: 'admin/game-template/game-template.html',
        css: 'admin/game-template/game-template.css',
        controller: gameTemplate
    });

gameTemplate.$inject = ['$routeParams', '$location', 'gameTemplateServiceFactory'];

function gameTemplate($routeParams, $location, templateService) {
    let vm = this;

    vm.showBuildTemplate = false;

    templateService.getAll().then((val) => {
        vm.templates = val
    });

    vm.showTemplate = function (templateId) {
        $location.path(`/templates/${templateId}`);
    };

    vm.deleteTemplate = function (templateId) {
        templateService.remove(templateId);
        $location.path(`/templates`)
    };

    vm.newTemplate = function () {
        templateService.createTemplate().then((res) => {
            $location.path(`/templates/${res.$id}`);
        })
    };


}