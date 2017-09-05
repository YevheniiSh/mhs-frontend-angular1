angular.module('resultSetup')
    .component('hintsRound', {
        templateUrl: 'admin/round-type/hints/hints-round.html',
        css: 'admin/round-type/hints/hints-round.css',
        controller: hintsRoundController
    });

hintsRoundController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function hintsRoundController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.isManualInput = false;
}
