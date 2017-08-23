angular.module('gameTemplate')
    .component('currentGameTemplate', {
        templateUrl: 'admin/game-template/current-game-template.html',
        controller: currentGameTemplate,
    });

currentGameTemplate.$inject = ['$routeParams','gameTemplateServiceFactory'];

function currentGameTemplate($routeParams, templateService){
    let vm = this;

    vm.$onInit = onInit;
    function onInit() {
        vm.templateId = $routeParams.templateId;

        //TODO: получать весь шаблон 1 запросом

        templateService.getRounds(vm.templateId).then(rounds => {
            vm.currentTemplateRounds = rounds.slice();
            if (rounds.length < 1) vm.currentTemplateRounds = [{numberOfQuestions: 10, name: ""}];
        });

        templateService.getTemplateName(vm.templateId).then(name =>{
            vm.currentTemplateName = name;
        });
    }

    vm.saveTemplate = function () {
        templateService.update(vm.templateId, {name:vm.currentTemplateName, rounds: vm.currentTemplateRounds});
    }
}