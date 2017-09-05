angular.module('resultSetup')
    .component('captainRoundType', {
        templateUrl: 'admin/round-type/captain/captain-round-type.html',
        css: 'admin/round-type/captain/captain-round-type.css',
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
