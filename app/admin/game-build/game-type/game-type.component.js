'use strict';
angular.module('gameType')
    .component('gameType', {
        templateUrl: 'admin/game-build/game-type/game-type.html',
        css: 'admin/game-build/game-type/game-type.css',
        controller: GameType
    });

GameType.$inject = ['gameTemplateServiceFactory', 'OpenGameServiceFactory', '$routeParams', '$location', '$timeout', '$scope', '$rootScope'];

function GameType(gameTemplateService, openGameService, $routeParams, $location, $timeout, $scope, $rootScope) {
    let vm = this;

    let templateRounds = [];

    vm.templateName = "";

    vm.$onInit = onInit;
    function onInit() {
        vm.gameId = $routeParams.gameId;

        vm.configRounds = [{numberOfQuestions: 10, name: ""}];

        gameTemplateService.getAll()
            .then((templates) => {
                vm.templates = templates;
            });

        openGameService.getRounds(vm.gameId).then(rounds => {
            if (rounds.length) {
                vm.configRounds = rounds.slice();
                templateRounds = rounds.slice();
                console.log("GET RUNDS");
            }
        });

        openGameService.getTemplateName(vm.gameId).then(templateName => {
            vm.templateName = templateName;
        })
    }

    vm.saveRounds = function () {
        console.log(templateRounds);
        console.log(vm.configRounds);
        console.log(angular.equals(templateRounds, vm.configRounds));
        if (templateRounds === vm.configRounds){
            vm.templateName = '';
            openGameService.setTemplateName(vm.gameId, vm.templateName)
        } else
            openGameService.setTemplateName(vm.gameId, vm.templateName);
        openGameService.addRounds(vm.gameId, vm.configRounds);
        // .then(rounds => vm.configRounds = convertRoundsObjectToArray(rounds));
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
        if (template) {
            vm.roundsChanged = false;
            vm.templateName = template.name;
            gameTemplateService.getRounds(template.$id)
                .then(rounds => {
                    vm.configRounds = rounds;
                })
        }
    };

    vm.templateNameFilter = function(){
            if (vm.templateName) return "!" + vm.templateName;
            else return ''
    }
}