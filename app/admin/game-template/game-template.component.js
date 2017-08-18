'use strict';
angular.module('gameTemplate')
    .component('gameTemplate', {
        templateUrl: 'admin/game-template/game-template.html',
        css: 'admin/game-template/game-template.css',
        controller: GameTemplate
    });

GameTemplate.$inject = ['$routeParams', '$location', 'gameTemplateServiceFactory'];

function GameTemplate($routeParams, $location, GameTemplateService) {
    let vm = this;

    GameTemplateService.getAll().then((val) => {
        vm.templates = val
    });

}