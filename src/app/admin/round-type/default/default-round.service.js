(function () {
  angular
    .module('resultSetup')
    .factory('DefaultRoundFactory', DefaultRoundFactory);

  DefaultRoundFactory.$inject = ['ResultServiceFactory', 'resultSetupBuilder'];

  function DefaultRoundFactory(ResultServiceFactory, resultSetupBuilder) {
    return {
      saveQuizResult: saveQuizResult
    };

    function saveQuizResult(result, gameId) {
      let res = resultSetupBuilder
        .addRound(result.round)
        .addQuiz(result.quiz)
        .addTeamId(result.teamId)
        .addScore(result.score)
        .addValue('numberOfCorrectAnswers', result.numberOfCorrectAnswers)
        .addValue('weightOfResponse', result.weightOfResponse)
        .getResult();

      ResultServiceFactory.saveResult('current', res, gameId);
    }
  }
})();
