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


    vm.showTemplate = function (templateId) {
        vm.showBuildTemplate = true;
        vm.templateId = templateId;
        getRounds();
        getTemplateName();
    };

    vm.deleteTemplate = function (templateId) {
        templateService.remove(templateId);
        vm.showBuildTemplate = false;
    };

    vm.newTemplate = function () {
        templateService.createTemplate().then((res) => {
            vm.showBuildTemplate = true;
            vm.templateId = res.$id;

            quizSequenceNumber = 1;

            vm.rounds.splice(0, vm.rounds.length);
            vm.rounds.push(createRound(quizSequenceNumber++));
        })
    };

    vm.createTemplate = function () {
        vm.showBuildTemplate = true
    };

    let quizSequenceNumber = 1;

    vm.templateName = '';
    vm.rounds = [];

    function getRounds() {
        templateService.getRounds(vm.templateId).then((res) => {
            vm.rounds = res;
            quizSequenceNumber = res.length + 1;
            vm.rounds.$watch(() => {
                getRounds();
            });
        });
    }

    function getTemplateName() {
        templateService.getTemplateName(vm.templateId).then((res) => {
            vm.templateName = res;
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
        templateService.updateName(vm.templateId, vm.templateName);
        templateService.updateRounds(vm.templateId, vm.rounds);
        vm.submitted = true;
        if (vm.submitted) $location.path("/templates");

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