angular.module('resultSetup')
    .component('defaultRound', {
        templateUrl: 'admin/round-type/default/default-round.html',
        css: 'admin/round-type/default/default-round.css',
        controller: defaultRoundController,
        bindings: {
            results: '=',
            isManualInput: '=',
            saveResult: '&'
        }
    });

defaultRoundController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
];

function defaultRoundController(resultSetupService, $routeParams, $location) {
    let vm = this;

    vm.isManualInput = false;


    vm.$onInit = onInit;

    function onInit() {

    }
}
