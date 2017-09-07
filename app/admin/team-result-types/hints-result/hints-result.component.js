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
        console.log(vm.teamId);
        vm.start = vm.round.roundType.start;
        vm.step = vm.round.roundType.step;
        vm.round.quizzes.forEach((item) => {
            if (item.score !== 0) {
                vm.score = item.score;
            }
        })
    }

    vm.onChange = function (quiz) {
        let quizSave = {quizNum: quiz.quizNum, score: vm.score};
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