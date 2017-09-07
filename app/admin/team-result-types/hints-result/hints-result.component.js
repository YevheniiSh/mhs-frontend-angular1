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
        vm.round.quizzes.forEach((item, index) => {
            if (item.score !== 0) {
                vm.quizNum = index + 1;
                vm.status = 1;
            }
            else if (item.real === true) {
                vm.status = 0;
                vm.quizNum = index + 1;
            }
        })
    }

    vm.onChange = function () {
        let scoreToSet = (vm.start - ((vm.quizNum - 1) * vm.step)) * vm.status;
        let quizSave = {quizNum: vm.quizNum, score: scoreToSet};
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
                vm.round.quizzes[vm.quizNum - 1].real = true;

            });



    }


}