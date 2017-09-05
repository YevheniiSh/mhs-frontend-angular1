angular.module('resultSetup')
    .component('captainRound', {
        templateUrl: 'admin/round-type/captain/captain-round-type.html',
        css: 'admin/round-type/captain/captain-round-type.css',
        controller: CaptainRoundTypeController,
        bindings: {
            results: '='
        },
    });

CaptainRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function CaptainRoundTypeController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;
    vm.OnClicked = function () {
        console.log(vm.results)
    }
}
