(function () {
  angular
    .module('gameResultsPage')
    .component('gameResults', {
      templateUrl: 'app/admin/game-results/game-results.html',
      css: 'app/admin/game-results/game-results.css',
      controller: GameResultsController
    });

  GameResultsController.$inject = ['ResultServiceFactory', '$rootScope', '$routeParams', '$location'];

  function GameResultsController(ResultService, $rootScope, $routeParams, $location) {
    this.isPresentationMode = $rootScope.presentationMode;

    this.getDetails = function (teamResult) {
      if (!this.isPresentationMode) {
        $location.path(`/games/${$routeParams.gameId}/results/${teamResult.teamId}`);
      }
    };

    ResultService.getParsedResults($routeParams.gameId)
      .then((result) => {
        this.results = result;
      });

    this.getTeamGames = function (teamId) {
      $location.path(`/teams/${teamId}`);
    }

    function isInteger(score){
      return Math.trunc(score) === score;
    }

    this.parseScoreView = function(score) {
      let parsedScore = Number(score);
      if (isInteger(score)){
        Math.round(parsedScore);
        console.log(parsedScore);
      }
      return parsedScore;
    }

  }
})();
