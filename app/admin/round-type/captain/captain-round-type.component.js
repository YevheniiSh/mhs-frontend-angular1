angular.module('resultSetup')
    .component('captainRound', {
        templateUrl: 'admin/round-type/captain/captain-round-type.html',
        css: 'admin/round-type/captain/captain-round-type.css',
        controller: CaptainRoundTypeController,
        bindings: {
            results: '=',
            saveResult: '&'
        },
    });

CaptainRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$scope'
];

function CaptainRoundTypeController(resultSetupService, $routeParams, $scope) {
    let vm = this;

}