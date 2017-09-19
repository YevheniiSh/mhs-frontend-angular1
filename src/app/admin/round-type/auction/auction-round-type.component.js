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
        saveResult: '&',
        disableNext: '='
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

    vm.onSave = function (result) {
      result.score = result.rate * result.status;
      console.log(result);
      vm.saveResult({result: result})
    };

    vm.switchEditState = function () {
      vm.disableNext = false;
      vm.showInputs = !vm.showInputs;
      if (!vm.showInputs) {
        vm.results.forEach((item) => {
          if (item.status < 0) {
            item.checked = false;
          }
          else {
            item.checked = true;
          }
        });
      }
      else {
        vm.results.forEach((item) => {
          delete item["auction"];

          if (item.score !== 0 && item.score !== undefined) {
            item.checked = true;
          }
          else {
            item.checked = false;
          }
        });
      }
      !vm.showInputs? vm.editStateText = 'Score': vm.editStateText = 'Correctness';
    };

  }
})();

