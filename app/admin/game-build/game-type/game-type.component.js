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
    vm.rounds = [];
    let gameId = $routeParams.gameId;
    vm.templateName = "";
    let quizSequenceNumber = 1;

    gameTemplateService.getAll()
        .then((templates)=>{
            vm.templates = templates;
        })

    openGameService.getRounds(gameId).then((res) => {

            vm.rounds = res;

            quizSequenceNumber = res.length + 1;

    });

    vm.addRound = function ($event) {
        console.dir("bb  add " )
        console.dir(vm.rounds)
        let quiz = {$id: quizSequenceNumber, numberOfQuestions: 10, name: ""};
        quizSequenceNumber++;
        vm.rounds.push(quiz);
        $event.preventDefault();
    };
    vm.deleteRound = function (index) {
        console.dir("bef  ")
        console.dir(  vm.rounds)
        if (vm.rounds.length >= index) {
            for (let i = index - 1; i < vm.rounds.length; i++) {
                vm.rounds[i].$id--;
            }
            quizSequenceNumber--;
        }
        vm.rounds.splice(index - 1, 1);

        console.dir("aft " )
        console.dir(vm.rounds)
    };

    vm.saveRounds = function () {
        vm.submitted = false;
        openGameService.addRounds(gameId, vm.rounds);
        vm.submitted = true;
    };

    vm.dissmiss = function () {
        vm.submitted = false;
    };

    vm.saveTemplate = function () {
        gameTemplateService.saveFromGame(gameId,vm.templateName);
    };

    vm.selectTemplate = function (template) {
        if(template){
            gameTemplateService.getRounds(template.$id)
                .then(rounds=>{
                    console.log(template)
                    vm.rounds = rounds;
                    quizSequenceNumber = rounds.length + 1
                })
        }
    }
}