angular.module('resultSetup')
    .component('defaultRoundType', {
        templateUrl: 'admin/result-setup/default/default-round-type.html',
        css: 'admin/result-setup/auction/default-round-type.css',
        controller: DefaultRoundTypeController
    });

DefaultRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function DefaultRoundTypeController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.isManualInput = false;
}
