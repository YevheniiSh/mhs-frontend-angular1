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
        $location.path(`/templates/${templateId}`);
    };

    vm.deleteTemplate = function (templateId) {
        templateService.remove(templateId);
    };

    vm.newTemplate = function () {
        templateService.createTemplate().then((res) => {
            // vm.templateName = '';
            // vm.showBuildTemplate = true;
            // vm.templateId = res.$id;
            //
            // quizSequenceNumber = 1;
            //
            // vm.rounds.splice(0, vm.rounds.length);
            // vm.rounds.push(createRound(quizSequenceNumber++));
            $location.path(`/templates/${res.$id}`);
            // templateService.updateRounds(res.$id, [{numberOfQuestions: 10, name: ""}]);
        })
    };

    // vm.createTemplate = function () {
    //     vm.showBuildTemplate = true
    // };
    //
    // let quizSequenceNumber = 1;
    //
    // vm.templateName = '';
    // vm.rounds = [];
    //
    // function getRounds() {
    //     templateService.getRounds(vm.templateId).then((res) => {
    //         vm.rounds = res;
    //         quizSequenceNumber = res.length + 1;
    //         vm.rounds.$watch(() => {
    //             getRounds();
    //         });
    //     });
    // }
    //
    // function getTemplateName() {
    //     templateService.getTemplateName(vm.templateId).then((res) => {
    //         vm.templateName = res;
    //     });
    // }
    //
    // vm.addRound = function ($event) {
    //     let quiz = createRound(quizSequenceNumber);
    //     quizSequenceNumber++;
    //     vm.rounds.push(quiz);
    //     console.log(vm.rounds);
    //     $event.preventDefault();
    // };
    //
    //
    //
    // vm.saveRounds = function () {
    //     vm.submitted = false;
    //     templateService.updateName(vm.templateId, vm.templateName);
    //     templateService.updateRounds(vm.templateId, vm.rounds);
    //     vm.submitted = true;
    //     if (vm.submitted) $location.path("/templates");
    //
    // };
    //
    // vm.dissmiss = function () {
    //     vm.submitted = false;
    // };
    //
    // function createRound(quizSequenceNumber) {
    //     return {$id: quizSequenceNumber, numberOfQuestions: 10, name: ""}
    // }
    //
    // vm.toTemplateList = function () {
    //     // $timeout(()=>{
    //     // }, 500)
    // }
}