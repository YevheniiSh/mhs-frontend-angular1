angular.module('resultSetup')
    .component('auctionRound', {
        templateUrl: 'admin/round-type/auction/auction-round-type.html',
        css: 'admin/round-type/auction/auction-round-type.css',
        controller: AuctionRoundTypeController
        ,
        bindings: {
            results: '=',
            onSave: '&'
        }
    });

AuctionRoundTypeController.$inject = [
    'resultSetupService',
    '$routeParams'
];

function AuctionRoundTypeController(resultSetupService, $routeParams) {
    let vm = this;

    vm.saveResult = function (result) {

        result.score = result.rate * result.status;
        vm.onSave({result:result})
    }

}
