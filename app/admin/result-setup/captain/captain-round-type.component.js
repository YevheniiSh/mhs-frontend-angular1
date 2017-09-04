angular.module('resultSetup')
    .component('captainRoundType', {
        templateUrl: 'admin/result-setup/captain/captain-round-type.html',
        css: 'admin/result-setup/auction/captain-round-type.css',
        controller: CaptainRoundTypeController
    });

CaptainRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function CaptainRoundTypeController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.isManualInput = false;
}
