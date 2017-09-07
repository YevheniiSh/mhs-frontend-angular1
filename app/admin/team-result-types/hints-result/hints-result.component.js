angular.module('teamResults')
    .component('hintsResult', {
        templateUrl: 'admin/team-result-types/hints-result/hints-result.html',
        css: 'admin/team-result-types/hints-result/hints-result.css',
        controller: hintsResultController,
        bindings: {
            round: "=",
            saveResult: "&"
        }
    });

hintsResultController.$inject = ['ResultServiceFactory', '$routeParams'];

function hintsResultController(resultService, $routeParams) {

    let vm = this;

    vm.$onInit = onInit;

    function onInit() {
        vm.teamId = $routeParams.teamId;
        vm.gameId = $routeParams.gameId;
        console.log(vm.round);
        vm.start = vm.round.roundType.start;
        vm.step = vm.round.roundType.step;
        vm.round.quizzes.forEach((item) => {
            if (item.score !== 0) {
                vm.score = item.score;
                vm.status = 1;
            }
            else if (item.real === true) {
                vm.status = 0;
                vm.score = vm.start - ((item.quizNum - 1) * vm.step);
            }
        })
    }

    vm.onChange = function (quiz) {
        let scoreToSet = vm.score * vm.status;
        let quizSave = {quizNum: quiz.quizNum, score: scoreToSet};
        vm.round.quizzes.forEach((item) => {
            if (item.real) {
                vm.quizToDelete = item.quizNum;
                item.real = false;
                item.score = 0;
            }
        });
        let resultKey = [vm.round.roundNum, vm.quizToDelete, vm.teamId].join('_');
        resultService.deleteResult(vm.gameId, resultKey)
            .then(() => {
                vm.saveResult({round: vm.round, quiz: quizSave});
                quiz.real = true;

            });



    }


}