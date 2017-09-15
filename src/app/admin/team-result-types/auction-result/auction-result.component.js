angular.module('teamResults')
  .component('auctionResult', {
    templateUrl: 'app/admin/team-result-types/auction-result/auction-result.html',
    css: 'app/admin/team-result-types/auction-result/auction-result.css',
    controller: AuctionResultController,
    bindings: {
      round: "=",
      resultDisabled: "=",
      saveResult: "&"
    }
  });

AuctionResultController.$inject = ['userAuthService'];

function AuctionResultController(userAuthService) {

  let vm = this;
  vm.resultDisabled = true;

  vm.$onInit = onInit;

  function onInit() {
    userAuthService.currentUser().then(res => {
      vm.user = res
    })
  }

  vm.getClass = function (quiz) {
    let score = +quiz.score;

    if (score > 0)
      return "btn-success";
    else if (score < 0)
      return "btn-danger";
    else
      return "btn-silver"
  };

  vm.initResults = function (result) {
    result.rate = Math.abs(result.score);
    setResultStatus(result)
  };

  vm.onSave = function (roundNumber, result) {
    result.score = calculateScore(result);
    result.real = true;
    vm.saveResult({roundNum: roundNumber, quiz: result});
  };

  function calculateScore(result) {
    return result.rate * result.status;
  }

  function setResultStatus(result) {
    if (result.score <= 0) {
      result.status = -1;
    } else {
      result.status = 1;
    }
  }

}
