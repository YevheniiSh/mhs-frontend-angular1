angular.module('resultSetup')
    .component('hintsRoundType', {
        templateUrl: 'admin/round-type/hints/hints-round-type.html',
        css: 'admin/round-type/hints/hints-round-type.css',
        controller: hintsRoundTypeController
    });

hintsRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function hintsRoundTypeController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.isManualInput = false;
}
