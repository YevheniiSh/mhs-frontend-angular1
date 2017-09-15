angular.module('teamResults')
  .component('hintsResult', {
    templateUrl: 'app/admin/team-result-types/hints-result/hints-result.html',
    css: 'app/admin/team-result-types/hints-result/hints-result.css',
    controller: hintsResultController,
    bindings: {
      round: "=",
      resultDisabled: "=",
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

  vm.onChange = function (quizNum) {
    if (!vm.resultDisabled) {
      vm.quizNum = quizNum;

      vm.round.quizzes.forEach((item) => {
        if (quizNum === item.quizNum) {
          item.real = true;
          item.edited = true
          item.score = (vm.start - ((quizNum - 1) * vm.step)) * vm.status;
        }

        else {
          item.real = false;
          item.score = 0
        }
        vm.saveResult({roundNum: vm.round.roundNum, quiz: item});

      });


    }

  }


}
