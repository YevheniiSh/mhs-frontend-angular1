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

    vm.showTemplate = function(templateId){
        vm.showBuildTemplate = true;
        getRounds(templateId);

    };

    vm.deleteTemplate = function (templateId) {
        templateService.remove(templateId);
    };

    vm.newTemplate = function () {
        templateService.createTemplate().then((res) => {
            $location.path("/templates/" +  res.$id);
        })
    };

    vm.createTemplate = function () {
        vm.showBuildTemplate = true
    };

    vm.templateName = '';
    vm.rounds = [];

    let quizSequenceNumber = 1;


    function getRounds(templateId) {
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
        if (vm.submitted)$location.path("/templates");

    };

    vm.dissmiss = function () {
        vm.submitted = false;
    };

    function createRound(quizSequenceNumber) {
        return {$id: quizSequenceNumber, numberOfQuestions: 10, name: ""}
    }

    vm.toTemplateList = function () {
        // $timeout(()=>{
        // }, 500)
    }
}