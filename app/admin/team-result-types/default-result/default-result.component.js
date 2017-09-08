angular.module('teamResults')
    .component('defaultResult', {
        templateUrl: 'admin/team-result-types/default-result/default-result.html',
        css: 'admin/team-result-types/default-result/default-result.css',
        bindings: {
            round: '=',
            resultDisabled: '<',
            saveResult: '&'
        },
        controller: defaultResultController
    });

defaultResultController.$inject = [];

function defaultResultController() {
    let vm = this;


    vm.$onInit = onInit;

    function onInit() {
        for (let quiz of vm.round.quizzes) {
            if (quiz.hasOwnProperty("weightOfResponse")) {

                quiz.countAnswer=+((quiz.score / quiz.weightOfResponse).toFixed(1));

            }
        }
    }

    vm.setScore = function (roundNum, quiz) {
        quiz.score = +((quiz.weightOfResponse * quiz.countAnswer).toFixed(1));
        vm.saveResult({roundNum: roundNum, quiz: quiz})
    }
}