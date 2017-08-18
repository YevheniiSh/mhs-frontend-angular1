'use strict';
angular.module('gameTemplate')
    .component('gameTemplate', {
        templateUrl: 'admin/game-template/game-template.html',
        css: 'admin/game-template/game-template.css',
        controller: gameTemplate
    });

gameTemplate.$inject = ['$routeParams', '$location', 'gameTemplateServiceFactory'];

function gameTemplate($routeParams, $location, gameTemplateService) {
    let vm = this;

    vm.showTemplate = function (templateId) {
        $location.path(`/templates/${templateId}`);
    };

    vm.deleteTemplate = function (templateId) {
        gameTemplateService.remove(templateId);
    };

    gameTemplateService.getAll().then((val) => {
        vm.templates = val
    });
    vm.createTemplate = function () {
        gameTemplateService.createTemplate().then((res) => {
            $location.path("/templates/" +  res.$id)
            debugger
        })
    }

}