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
           console.log(rounds.length);
           // angular.forEach(vm.currentTemplateRounds, e=>{
           //     console.log(e.$id);
           // })
        });

        templateService.getTemplateName(vm.templateId).then(name =>{
            vm.currentTemplateName = name;
            console.log(name);
        })
        // vm.getResults();
    }

    vm.saveTemplate = function () {
        templateService.updateName(vm.templateId, vm.currentTemplateName);
        templateService.updateRounds(vm.templateId, vm.currentTemplateRounds);
    }

}