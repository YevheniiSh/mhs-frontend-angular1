angular.module('resultSetup')
    .component('auctionRound', {
        templateUrl: 'admin/round-type/auction/auction-round-type.html',
        css: 'admin/round-type/auction/auction-round-type.css',
        controller: AuctionRoundTypeController
        ,
        bindings: {
            results: '=',
            saveResult: '&'
        }
    });

AuctionRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams'
];

function AuctionRoundTypeController(resultSetupService, $routeParams) {
    let vm = this;

    vm.OnClicked = function () {
        console.log(vm.results)
    }

}
