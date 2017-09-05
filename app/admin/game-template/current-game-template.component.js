angular.module('gameTemplate')
    .component('currentGameTemplate', {
        templateUrl: 'admin/game-template/current-game-template.html',
        css: 'admin/game-template/current-game-template.css',
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
            templateService.getRounds(vm.templateId)
                .then(rounds=>{
                    vm.currentTemplateRounds = rounds;
                    if (!template.rounds) vm.currentTemplateRounds = [{numberOfQuestions: 10, name: ""}];
                });
            vm.currentTemplateName = template.name;
        });
    }

    vm.saveTemplate = function () {
        templateService.update(vm.templateId, {name:vm.currentTemplateName, rounds: vm.currentTemplateRounds})
            .then(template => vm.currentTemplateRounds = template.rounds.slice(1, template.rounds.length))
    }
}