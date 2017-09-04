angular.module('resultSetup')
    .component('auction', {
        templateUrl: 'admin/result-setup/auction/auction.html',
        css: 'admin/result-setup/auction/auction.css',
        controller: AuctionController
    });

AuctionController.$inject = [
    'resultSetupService',
    '$routeParams',
    '$location',
    '$scope'
];

function AuctionController(resultSetupService, $routeParams, $location, $scope) {
    let vm = this;

    vm.isManualInput = false;
}
