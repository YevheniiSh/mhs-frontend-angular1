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

        // vm.auth = false;
        // userAuthService.currentUser().then((res) => {
        //     vm.auth = true;
        // }).catch((err) => {
        //     vm.auth = false;
        // });

        templateService.getRounds(vm.templateId).then(rounds => {
           vm.currentTemplateRounds = rounds;
        });

        templateService.getTemplateName(vm.templateId).then(name =>{
            vm.currentTemplateName = name;
        })
    }

    vm.saveTemplate = function () {
        console.log(vm.currentTemplateRounds);
        templateService.update(vm.templateId, {name:vm.currentTemplateName, rounds: vm.currentTemplateRounds});
    }

}