'use strict';
angular.module('gameTemplate')
    .component('gameTemplate', {
        templateUrl: 'admin/game-template/game-template.html',
        css: 'admin/game-template/game-template.css',
        controller: GameTemplate
    });

GameTemplate.$inject = ['$routeParams', '$location'];

function GameTemplate($routeParams, $location) {
    let vm = this;


}