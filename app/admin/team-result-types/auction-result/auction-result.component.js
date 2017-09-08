angular.module('teamResults')
    .component('auctionResult', {
        templateUrl: 'admin/team-result-types/auction-result/auction-result.html',
        css: 'admin/team-result-types/auction-result/auction-result.css',
        controller: AuctionResultController,
        bindings: {
            round: "=",
            resultDisabled: "=",
            saveResult: "&"
        }
    });

AuctionResultController.$inject = [];

function AuctionResultController() {

    let vm = this;

    vm.getClass = function (quiz) {
        let score = +quiz.score;
        switch (score) {
            case score > 0:
                return "btn-success";
            case score < 0:
                return "btn-danger";
            default:
                return "btn-silver"
        }
    };

    vm.initResults = function (result) {
        result.rate = Math.abs(result.score);
        setResultStatus(result)
    };

    vm.onSave = function (roundNumber, result) {
        result.score = calculateScore(result);
        vm.saveResult({roundNum: roundNumber, quiz: result});
    };

    function calculateScore(result) {
        return result.rate * result.status;
    }

    function setResultStatus(result) {
        if (result.score <= 0) {
            result.status = -1;
        } else {
            result.status = 1;
        }
    }

}