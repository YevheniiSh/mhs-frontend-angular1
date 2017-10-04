'use strict';
(function () {
  angular.module('resultSetup')
    .component('resultSetup', {
      templateUrl: 'app/admin/result-setup/result-setup.html',
      css: 'app/admin/result-setup/result-setup.css',
      controller: ResultSetupController
    });

  ResultSetupController.$inject = [
    'resultSetupService',
    '$scope',
    '$routeParams',
    '$location',
    '$window',
    'resultSetupBuilder',
    'CustomConfirmationService'
  ];

  function ResultSetupController(resultSetupService, $scope, $routeParams, $location, $window, resultSetupBuilder, customConfirmationService) {
    let vm = this;

    vm.isManualInput = false;
    vm.selectedQuiz = $routeParams.quizNumber;
    vm.isCaptainsOut = false;
    vm.$onInit = onInit;

    vm.confirmBetsButtonText = "CONFIRM_BETS_BUTTON";

    function onInit() {
      vm.answerCount = 0;
      initRound();
      initCurrentRound();
      initCurrentQuiz();
      getTeams()
        .then(() => {
          buildResults();
          assignResults()
            .then(initInputType)
            .then(initAuctionResults)
            .then(initCaptainResults)
            .then(initHintsResults);
        })

    }

    function initInputType() {
      angular.forEach(vm.results, (result) => {
        if (result.score != 0 && result.score != 1 && result.score != undefined) {
          vm.isManualInput = true;
        }
      })
    }

    function initRound() {
      resultSetupService.getRound($routeParams.gameId, $routeParams.roundNumber)
        .then((round) => {
          vm.round = round;
          vm.roundStep = round.roundType.step;
          vm.roundStart = round.roundType.start;
          vm.quizNumber = $routeParams.quizNumber;
        });
    }

    function initCurrentQuiz() {
      resultSetupService.getCurrentQuiz($routeParams.gameId)
        .then((quiz) => {
          vm.currentQuiz = quiz;
        })
    }

    function initCurrentRound() {
      resultSetupService.getCurrentRound($routeParams.gameId)
        .then((round) => {
          vm.currentRound = round;
        })
    }

    function initAuctionResults() {
      if (vm.round.roundType.type === 'AUCTION_ROUND') {
        vm.disableNext = true;

        for (let result of vm.results) {
          if (result.score !== undefined) {
            result.rate = Math.abs(result.score);

            setResultStatus(result);
          }
          else {
            result.rate = 0;
            result.status = false
          }
        }
      }
    }

    function initCaptainResults() {
      if (vm.round.roundType.type === 'CAPTAIN_ROUND') {
        initQuizWeightToCaptain();
        for (let result of vm.results) {
          setResultStatus(result);
        }
      }
    }

    function initHintsResults() {
      if (vm.round.roundType.type === 'HINTS_ROUND') {
        initQuizWeightToHint();
      }
    }

    function initQuizWeightToCaptain() {
      vm.quizWeight = +(vm.roundStart + (vm.roundStep * (vm.quizNumber - 1))).toFixed(1);
    }

    function initQuizWeightToHint() {
      vm.quizWeight = +(vm.roundStart - (vm.roundStep * (vm.quizNumber - 1))).toFixed(1);
    }

    function setResultStatus(result) {
      result.status = result.score > 0;
    }

    function getTeams() {
      return resultSetupService.getGameTeams($routeParams.gameId)
        .then((teams) => {
          vm.teams = teams;
        });
    }

    function buildResults() {
      vm.results = {};
      angular.forEach(vm.teams, function (team) {
        let resultKey = [vm.round.$id, vm.selectedQuiz, team.teamId].join('_');

        let result = resultSetupBuilder
          .addQuiz(vm.selectedQuiz)
          .addRound(vm.round.$id)
          .addTeamId(team.teamId)
          .addScore()
          .getResult();

        vm.results[resultKey] = result;
        vm.results[resultKey].teamName = team.name;

      });
      $scope.$watch(() => {
        return vm.results;
      }, (newValue) => {
        vm.answerCount = 0;
        newValue.forEach((item) => {
          if (item.checked) {
            vm.answerCount++;
          }
        })
      }, true)

    }

    function assignResults() {
      return resultSetupService.getQuizResults(vm.round.$id, vm.selectedQuiz, $routeParams.gameId)
        .then((res) => {
          res.forEach((result, key) => {
            if (result.hasOwnProperty("answer") && result.score === 0) {
              result.score = -1;
            }
            Object.assign(vm.results[key], result);
            setChecked(vm.results[key]);
          });
          vm.results = Object.keys(vm.results).map(it => vm.results[it])
        });
    }

    function setChecked(result) {
      if (result.score === -1 && result.hasOwnProperty("answer") && result.needSave === true) {
        result.checked = 1;
        result.score = 0;
      }
      else if (result.hasOwnProperty("auction")) {
        if (result.auction !== null) {
          result.checked = 1;
        }
        else {
          result.checked = 0;
        }
      }
      else if ((result.score !== 0 && result.score !== undefined)) {
        result.checked = 1;
      }
      else {
        result.checked = 0;
      }
    }

    function convertScoreForHintsRound(result) {
      if (result.score === 0 && result.hasOwnProperty("answer")) {
        result.score = -1;
      }
    }

    vm.confirmBets = function () {
      vm.disableNext = !vm.disableNext;
      if (vm.disableNext) {
        vm.confirmBetsButtonText = "CONFIRM_BETS_BUTTON";
      }
      else {
        vm.confirmBetsButtonText = "CHANGE_BETS_BUTTON";
      }
    };

    vm.saveResult = function (result) {
      result.needSave = true;
      setChecked(result);
      resultSetupService.saveQuizResult(result, $routeParams.gameId)
        .then(() => {
          convertScoreForHintsRound(result);
        });
    };

    vm.setQuiz = function (quizNumber) {
      let ref = `/games/${$routeParams.gameId}/rounds/${$routeParams.roundNumber}/${quizNumber}`;
      $location.path(ref);
    };

    vm.nextQuiz = function () {
      if (!isExistTeamToAnswer()) {
        createCloseRoundConfirmation('FINISH_ROUND_CONFIRMATION_TITLE', `FINISH_${vm.round.roundType.type}_CONFIRMATION`)
      } else if (vm.selectedQuiz < vm.round.numberOfQuestions) {
        incrementQuiz();
      } else if (+vm.selectedQuiz === +vm.round.numberOfQuestions) {
        finishRound();
      }
    };

    function isExistTeamToAnswer() {
      let isTeamExist = true;
      let hasScore = (r) => { return !!r.score };
      switch (vm.round.roundType.type) {
        case 'CAPTAIN_ROUND': {
          isTeamExist = vm.results.some(hasScore);
          break;
        }
        case 'HINTS_ROUND': {
          isTeamExist = !vm.results.every(hasScore);
          break;
        }
      }
      return isTeamExist;
    }

    function createCloseRoundConfirmation(title, message) {
      customConfirmationService.create(title, message)
        .then(finishRound);
    }

    function incrementQuiz() {
      if (+vm.currentQuiz === +vm.selectedQuiz) {
        vm.currentQuiz++;
        resultSetupService.setCurrentQuiz(vm.currentQuiz, $routeParams.gameId);
      }
      vm.setQuiz(+vm.selectedQuiz + 1);
    }

    function finishRound() {
      resultSetupService.finishRound($routeParams.roundNumber, $routeParams.gameId)
        .then(() => {
          $location.path(`/games/${$routeParams.gameId}/rounds`);
        });
    }

    vm.range = function (n) {
      return new Array(n).fill().map((e, i) => i + 1);
    };
  }
})();
