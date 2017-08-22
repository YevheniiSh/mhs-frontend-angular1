angular.module('gameTemplate')
    .component('currentGameTemplate', {
        templateUrl: 'admin/game-template/current-game-template.html',
        controller: currentGameTemplate
    });

currentGameTemplate.$inject = ['$routeParams','gameTemplateServiceFactory'];

function currentGameTemplate($routeParams, templateService){
    let vm = this;

    vm.$onInit = onInit;
    function onInit() {
        vm.templateId = $routeParams.templateId;

        templateService.getRounds(vm.templateId).then(res => {
            let rounds = [];
            for (let i = 0; i < res.length; i++) {
                rounds.push(res[i]);
            }
            vm.currentTemplateRounds = rounds;
            if (rounds.length < 1) vm.currentTemplateRounds = [{numberOfQuestions: 10, name: ""}];
        });

        templateService.getTemplateName(vm.templateId).then(name =>{
            vm.currentTemplateName = name;
        });
    }

    vm.saveTemplate = function () {
        console.log(vm.currentTemplateRounds);
        templateService.update(vm.templateId, {name:vm.currentTemplateName, rounds: vm.currentTemplateRounds});
    }
}