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
    '$routeParams',
    '$scope'
];

function AuctionRoundTypeController(resultSetupService, $routeParams, $scope) {
    let vm = this;

    $scope.$watch(() => {
        return vm.results;
    }, (res) => {
        if (res !== undefined && res[0].rate === undefined)
            initResults(res);
    });

    vm.saveResult = function (result) {
        result.score = result.rate * result.status;
        vm.onSave({result: result})
    };

    function initResults(res) {
        for (let i in res) {
            if (res[i].score !== undefined) {
                res[i].rate = Math.abs(res[i].score);

                if (res[i].score <= 0) {
                    res[i].status = -1
                } else
                    res[i].status = 1
            }
            else {
                res[i].rate = 0;
                res[i].status = -1
            }

        }
    }


}
