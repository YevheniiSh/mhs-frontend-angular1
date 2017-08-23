'use strict';
angular.module('gameType')
    .component('gameType', {
        templateUrl: 'admin/game-build/game-type/game-type.html',
        css: 'admin/game-build/game-type/game-type.css',
        controller: GameType
    });

GameType.$inject = ['gameTemplateServiceFactory', 'OpenGameServiceFactory', '$routeParams', '$location'];

function GameType(gameTemplateService, openGameService, $routeParams, $location) {
    let vm = this;

    vm.$onInit = onInit;
    function onInit() {
        vm.gameId = $routeParams.gameId;

        vm.configRounds = [{numberOfQuestions: 10, name: ""}];

        gameTemplateService.getAll()
            .then((templates) => {
                vm.templates = templates;
            });

        openGameService.getRounds(vm.gameId).then(rounds => {
            if(rounds.length)vm.configRounds = rounds.slice();
        });
    }

    vm.saveRounds = function () {
        openGameService.addRounds(vm.gameId, vm.configRounds);
    };

    // vm.saveTemplate = function () {
    //     gameTemplateService.saveFromGame(vm.gameId, vm.templateName);
    // };

    vm.selectTemplate = function (template) {
        if(template){
            gameTemplateService.getRounds(template.$id)
                .then(rounds=>{
                    vm.configRounds = rounds;
                })
        }
    }
}