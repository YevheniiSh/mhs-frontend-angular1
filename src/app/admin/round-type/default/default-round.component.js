(function () {
  angular.module('resultSetup')
    .component('defaultRound', {
      templateUrl: 'app/admin/round-type/default/default-round.html',
      css: 'app/admin/round-type/default/default-round.css',
      controller: DefaultRoundController,
      bindings: {
        results: '=',
        isManualInput: '='
      }
    });

  DefaultRoundController.$inject = ['$routeParams', 'DefaultRoundFactory', 'resultSetupService', '$scope', 'RoundStatusService'];

  function DefaultRoundController($routeParams, DefaultRoundFactory, resultSetupService, $scope, RoundService) {
    let vm = this;

    vm.$onInit = onInit;

    function onInit() {
      vm.selectedQuiz = $routeParams.quizNumber;
      vm.weightOfResponse = 0.1;

      getQuizResults()
        .then((results) => {
          if (results[Object.keys(results)[4]] !== null) {
            getWeightOfResponse(results[Object.keys(results)[4]])
          }
        })
    }

    function getQuizResults() {
      return resultSetupService.getQuizResults($routeParams.roundNumber, vm.selectedQuiz, $routeParams.gameId);
    }

    function getWeightOfResponse(result) {
      if (result.weightOfResponse !== undefined) {
        vm.isManualInput = true;
      }
      vm.weightOfResponse = result.weightOfResponse;
    }

    function calculateScore(result) {
      return Math.floor(result.numberOfCorrectAnswers * vm.weightOfResponse * 100) / 100
    }

    function save(result) {
      if (result.weightOfResponse === undefined) {
        resultSetupService.saveQuizResult(result, $routeParams.gameId);
      } else {
        DefaultRoundFactory.saveQuizResult(result, $routeParams.gameId);
      }
    }

    vm.saveResult = function (result) {
      if (Math.sign(result.numberOfCorrectAnswers) === -1 || -0) result.numberOfCorrectAnswers = 0;
      if (parseInt(result.numberOfCorrectAnswers) !== result.numberOfCorrectAnswers) result.numberOfCorrectAnswers = 0;
      if (vm.isManualInput) {
        result.score = calculateScore(result);
        result.weightOfResponse = vm.weightOfResponse;
      } else {
        if (result.hasOwnProperty("weightOfResponse"))
          delete result.weightOfResponse;
      }
      save(result);
    };

    vm.recalculateScore = function () {
      for (let result of vm.results) {
        if (result.numberOfCorrectAnswers === undefined) {
          result.numberOfCorrectAnswers = 0;
          continue;
        }
        if (result.numberOfCorrectAnswers === 0) {
          continue;
        }
        result.score = calculateScore(result);
        save(result);
      }
      RoundService.setQuizStatus($routeParams.gameId, $routeParams.roundNumber, vm.selectedQuiz, {weight: vm.weightOfResponse});
    };

    vm.selectAllContent = function ($event) {
      $event.target.select();
    };

    vm.setWeight = function () {
      if (vm.isManualInput) {
        RoundService.setQuizStatus($routeParams.gameId, $routeParams.roundNumber, vm.selectedQuiz, {weight: vm.weightOfResponse});
      }
      else {
        RoundService.setQuizStatus($routeParams.gameId, $routeParams.roundNumber, vm.selectedQuiz, null);
      }
    }
  }
})();
