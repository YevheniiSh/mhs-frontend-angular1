angular.module('resultSetup')
  .component('captainRound', {
    templateUrl: 'app/admin/round-type/captain/captain-round-type.html',
    css: 'app/admin/round-type/captain/captain-round-type.css',
    controller: CaptainRoundTypeController,
    bindings: {
      results: '=',
      saveResult: '&',
      isCaptainsOut: '=',
      closeRound: "&"
    },
  });

CaptainRoundTypeController.$inject = [
  '$scope',
  '$routeParams',
  'GameServiceFactory',
  'ResultServiceFactory',
  'CustomConfirmationService'
];

function CaptainRoundTypeController($scope, $routeParams, GameServiceFactory, ResultServiceFactory, CustomConfirmationService) {
  let vm = this;
  vm.noCaptainsAlertDisplay = false;

  vm.$onInit = onInit;

  function onInit() {
    getRound()
      .then(getQuizWeight);
    initPreviousQuizResults();

    $scope.$watch(() => {
        return vm.isCaptainsOut
      },
      (newValue) => {
        console.log(newValue);
        if (newValue) {
          showCloseRoundDialog();
        }
      });
  }

  function showCloseRoundDialog() {
    CustomConfirmationService.create('NO_CAPTAINS_ALERT')
      .then((res) => {
        if (res.resolved) {
          vm.closeRound();
        }
      })
  }

  function getRound() {
    return GameServiceFactory.getRoundByGameAndId($routeParams.gameId, $routeParams.roundNumber);
  }

  function getQuizWeight(round) {
    vm.weight = round.roundType.start + (round.roundType.step * ($routeParams.quizNumber - 1));
  }

  function initPreviousQuizResults() {
    ResultServiceFactory.getByRoundAndQuiz(
      $routeParams.roundNumber,
      $routeParams.quizNumber - 1,
      $routeParams.gameId
    )
      .then(results => {
        vm.previousQuizResults = results;
      })
  }

  vm.isDisabled = function (teamId) {
    if (!isFirstQuiz()) {
      let resultKey = [$routeParams.roundNumber, $routeParams.quizNumber - 1, teamId].join('_');
      if (vm.previousQuizResults[resultKey] === undefined) {
        return true;
      } else if (!+vm.previousQuizResults[resultKey].score) {
        return true;
      }
      return false;
    }
  };


  function isFirstQuiz() {
    return $routeParams.quizNumber === '1';
  }

}
