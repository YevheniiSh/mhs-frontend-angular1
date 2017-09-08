angular.module('teamResults')
    .component('auctionResult', {
        templateUrl: 'admin/team-result-types/auction-result/auction-result.html',
        css: 'admin/team-result-types/auction-result/auction-result.css',
        controller: AuctionResultController,
        bindings:{
            round: "=",
            resultDisabled: "=",
            saveResult: "&"
        }
    });

AuctionResultController.$inject = [];

function AuctionResultController(){

    let vm = this;

    vm.editResult = false;

    vm.getClass = function (quiz) {
        let score = +quiz.score;
        console.log(score);
        switch (score){
            case score > 0:
                return "btn-success";
            case score < 0:
                return "btn-danger";
            default:
                return "btn-silver"
        }
    }
    //
    // vm.changeQuizState = function () {
    //     if (!vm.editResult){
    //         vm.quiz.score = -vm.quiz.score
    //     }
    // }
    //
    // $scope.$watch(() => {
    //     return vm.results;
    // }, (res) => {
    //     if (res !== undefined && res[0].rate === undefined)
    //         initResults(res);
    // });
    //
    // vm.onSave = function (result) {
    //     result.score = result.rate * result.status;
    //     vm.saveResult({result: result})
    // };
    //
    // function initResults(res) {
    //     for (let result of res) {
    //         if (result.score !== undefined) {
    //             result.rate = Math.abs(result.score);
    //
    //             setResultStatus(result);
    //         }
    //         else {
    //             result.rate = 0;
    //             result.status = -1
    //         }
    //     }
    // }
    //
    // function setResultStatus(result) {
    //     if (result.score <= 0) {
    //         result.status = -1
    //     } else
    //         result.status = 1
    // }

}