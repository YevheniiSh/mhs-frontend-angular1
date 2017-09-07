angular.module('teamResults')
    .component('hintsResult', {
        templateUrl: 'admin/team-result-types/hints-result/hints-result.html',
        css: 'admin/team-result-types/hints-result/hints-result.css',
        controller: hintsResultController,
        bindings: {
            results: "=",
            saveResult: "&"
        }
    });

hintsResultController.$inject = [];

function hintsResultController(){

    let vm = this;

    vm.$onInit = onInit;

    function onInit() {
        console.log(vm.results);
        vm.score = 1;
    }


}