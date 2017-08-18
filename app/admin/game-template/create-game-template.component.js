'use strict';
angular.module('gameTemplate')
    .component('createGameTemplate', {
        templateUrl: 'admin/game-template/create-game-template.html',
        css: 'admin/game-template/create-game-template.css',
        controller: createGameTemplate
    });

createGameTemplate.$inject = ['gameTemplateServiceFactory', '$routeParams', '$location'];

function createGameTemplate(templateService, $routeParams, $location) {
    let vm = this;


    vm.templateName = '';
    vm.rounds = [];
    let templateId = $routeParams.templateId;

    let quizSequenceNumber = 1;

    templateService.getTemplateName(templateId).then((res) => {
        vm.templateName = res;
    });
    getRounds();

    function getRounds() {
        templateService.getRounds(templateId).then((res) => {
            vm.rounds = res;
            quizSequenceNumber = res.length + 1;
            vm.rounds.$watch(() => {
                getRounds();
            });
        });
    }



    vm.addRound = function ($event) {
        let quiz = createRound(quizSequenceNumber);
        quizSequenceNumber++;
        vm.rounds.push(quiz);
        console.log(vm.rounds);
        $event.preventDefault();
    };
    vm.deleteRound = function (index) {
        if (vm.rounds.length >= index) {
            for (let i = index - 1; i < vm.rounds.length; i++) {
                vm.rounds[i].$id--;
            }
            quizSequenceNumber--;
        }

        vm.rounds.splice(index - 1, 1);

    };

    vm.saveRounds = function () {

        vm.submitted = false;
        templateService.updateName(templateId, vm.templateName);
        templateService.updateRounds(templateId, vm.rounds);
        vm.submitted = true;
    };

    vm.dissmiss = function () {
        vm.submitted = false;
    };

    function createRound(quizSequenceNumber) {
        return {$id: quizSequenceNumber, numberOfQuestions: 10, name: ""}
    }

}