angular.module('gameTemplate')
    .component('currentGameTemplate', {
        templateUrl: 'admin/game-template/current-game-template.html',
        controller: currentGameTemplate,
    });

currentGameTemplate.$inject = ['$routeParams','gameTemplateServiceFactory'];

function currentGameTemplate($routeParams, templateService){
    let vm = this;
    vm.selected = false;

    vm.$onInit = onInit;
    function onInit() {
        vm.templateId = $routeParams.templateId;

        templateService.getById(vm.templateId).then(template => {
            vm.currentTemplateName = template.name;
            vm.currentTemplateRounds = template.rounds;
            if (!template.rounds) vm.currentTemplateRounds = [{numberOfQuestions: 10, name: ""}];
        });
    }

    vm.saveTemplate = function () {
        templateService.update(vm.templateId, {name:vm.currentTemplateName, rounds: vm.currentTemplateRounds});
    }
}