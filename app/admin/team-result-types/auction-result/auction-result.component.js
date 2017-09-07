angular.module('teamResults')
    .component('auctionResult', {
        templateUrl: 'admin/team-result-types/auction-result/auction-result.html',
        css: 'admin/team-result-types/auction-result/auction-result.html',
        controller: AuctionResultController
    });

AuctionResultController.$inject = [];

function AuctionResultController(){

}