angular.module('resultSetup')
    .component('auctionRoundType', {
        templateUrl: 'admin/result-setup/auction-round-type.html',
        css: 'admin/result-setup/auction-round-type.css',
        controller: AuctionRoundTypeController
    });

AuctionRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function AuctionRoundTypeController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.isManualInput = false;
}
