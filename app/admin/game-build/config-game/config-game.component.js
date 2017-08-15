'use strict';
angular.module('configGame')
    .component('configGame', {
        templateUrl: 'admin/game-build/config-game/config-game.html',
        css: 'admin/game-build/config-game/config-game.css',
        controller: ['$location',
            function ($location) {
                let vm = this;
                vm.onBack = function () {
                    $location.path("/games")
                }
            }]
    });


