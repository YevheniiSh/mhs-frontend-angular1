angular.module('teamResults')
  .component('captainResult', {
    templateUrl: 'app/admin/team-result-types/captain-result/captain-result.html',
    css: 'app/admin/team-result-types/captain-result/captain-result.css',
    controller: captainResultController,
    bindings: {
      round: '=',
      saveResult: '&',
      resultDisabled: '='
    }
  });

captainResultController.$inject = [];

function captainResultController() {
  let vm = this;

  vm.$onInit = onInit;

  function onInit() {
    vm.lastResultIndex = getLastResult();
  }

  function getLastResult() {
    let lastResultIndex = 0;
    vm.round.quizzes.forEach((quiz) => {
      if (quiz.score !== 0) {
        lastResultIndex = quiz.quizNum;
      }
    });
    return lastResultIndex;
  }

  vm.setLastResultIndex = function (index) {
    vm.lastResultIndex = index;
  };

  vm.setResult = function (index) {
    vm.setLastResultIndex(index);
    vm.saveCaptainResults();
  };

  vm.saveCaptainResults = function () {
    angular.forEach(vm.round.quizzes, (quiz) => {
      if (vm.lastResultIndex >= quiz.quizNum) {
        quiz.score = vm.round.roundType.start + vm.round.roundType.step * (quiz.quizNum - 1);
        vm.saveResult({roundNum: vm.round.roundNum, quiz: quiz});
      }
      else if (vm.lastResultIndex < quiz.quizNum) {
        quiz.score = 0;
        vm.saveResult({roundNum: vm.round.roundNum, quiz: quiz});
      }
    })
  }

}
