'use strict';
(function () {
  angular
    .module('resultSetup')
    .component('auctionRound', {
      templateUrl: 'app/admin/round-type/auction/auction-round-type.html',
      css: 'app/admin/round-type/auction/auction-round-type.css',
      controller: AuctionRoundTypeController
      ,
      bindings: {
        results: '=',
        saveResult: '&'
      }
    });

  AuctionRoundTypeController.$inject = [
    '$scope',
    '$routeParams',
    'GameServiceFactory'
  ];

  function AuctionRoundTypeController($scope, $routeParams, GameServiceFactory) {
    let vm = this;

    vm.showInputs = true;
    vm.editStateText = 'Correctness';

    GameServiceFactory.getRoundByGameAndId($routeParams.gameId, $routeParams.roundNumber)
      .then((round) => {
        vm.round = round;
      });

    $scope.$watch(() => {
      return vm.results;
    }, (res) => {
      if (res !== undefined && res[0].rate === undefined)
        initResults(res);
    });

    vm.onSave = function (result) {
      result.score = result.rate * result.status;
      vm.saveResult({result: result})
    };

    vm.switchEditState = function () {
      vm.showInputs = !vm.showInputs;
      if (!vm.showInputs) vm.editStateText = 'Score';
      else vm.editStateText = 'Correctness';
    };

    function initResults(res) {
      for (let result of res) {
        if (result.score !== undefined) {
          result.rate = Math.abs(result.score);

          setResultStatus(result);
        }
        else {
          result.rate = 0;
          result.status = -1
        }
      }
    }

    function setResultStatus(result) {
      if (result.score <= 0) {
        result.status = -1
      } else
        result.status = 1
    }
  }
})();

