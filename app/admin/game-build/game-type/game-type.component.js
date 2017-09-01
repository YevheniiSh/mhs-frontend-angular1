'use strict';
angular.module('gameType')
    .component('gameType', {
        templateUrl: 'admin/game-build/game-type/game-type.html',
        css: 'admin/game-build/game-type/game-type.css',
        controller: GameType
    });

GameType.$inject = ['gameTemplateServiceFactory', 'OpenGameServiceFactory', '$routeParams', '$location', '$timeout'];

function GameType(gameTemplateService, openGameService, $routeParams, $location, $timeout) {
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
        openGameService.addRounds(vm.gameId, vm.configRounds)
            .then(rounds => vm.configRounds = convertRoundsObjectToArray(rounds));
        vm.submitted = true;
        vm.templateFormShow = true;
        $timeout(() => {
            vm.submitted = false;
        }, 1500);
    };

    let convertRoundsObjectToArray = function (object) {
        let array = [];
        angular.forEach(object, round => {
            array.push(round);
        });
        return array
    };

    vm.saveTemplate = function () {
        gameTemplateService.saveFromGame(vm.gameId, vm.templateName);
        vm.templateFormShow = false;
        vm.templateSaved = true;
        $timeout(() => {
            vm.templateSaved = false;
        }, 1500);
    };

    vm.selectTemplate = function (template) {
        if(template){
            gameTemplateService.getRounds(template.$id)
                .then(rounds=>{
                    vm.configRounds = rounds;
                })
        }
    }
}