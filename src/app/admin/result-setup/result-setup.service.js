'use strict';
(function () {
  angular
    .module('resultSetup')
    .factory('resultSetupService', resultSetupService);

  resultSetupService.$inject = ['GameServiceFactory', 'ResultServiceFactory', 'resultSetupBuilder'];

  function resultSetupService(gameFactory, resultFactory, resultSetupBuilder) {
    return {
      getRound: getRound,
      getGameTeams: getGameTeams,
      saveQuizResult: saveQuizResult,
      roundIncrement: roundIncrement,
      getQuizResults: getQuizResults,
      getCurrentQuiz: getCurrentQuiz,
      getCurrentRound: getCurrentRound,
      saveQuizResults: saveQuizResults,
      setCurrentQuiz: setCurrentQuiz,
      finishRound: finishRound
    };

        function getGameTeams(gameId) {
            return gameFactory.getGameTeams(gameId)
                .then(
                    (teams) => {
                        return teams;
                    },
                    (err) => {
                        throw err;
                    }
                )
        }

    function finishRound(roundNumber, gameId) {
      return roundIncrement(roundNumber, gameId)
        .then(() => {
            setCurrentQuiz(1, gameId);
          }
        )
    }

        function saveQuizResult(result, gameId) {
          let res = resultSetupBuilder
            .addRound(result.round)
            .addQuiz(result.quiz)
            .addTeamId(result.teamId)
            .addScore(result.score);

          if (result.answer) {
            res.addValue("answer", result.answer)
          }

          return resultFactory.saveResult('current', res.getResult(), gameId);
        }

        function saveQuizResults(results, gameId) {
            results.forEach((result) => {
                if (result.score === undefined) {
                    result.score = 0;
                    saveQuizResult(result, gameId)
                }
            })
        }

        function getQuizResults(roundId, quizId, gameId) {
            return resultFactory.getByRoundAndQuiz(roundId, quizId, gameId);
        }

        function getRound(gameId, roundId) {
            return gameFactory.getRoundByGameAndId(gameId, roundId);
        }

        function roundIncrement(roundNumber, gameId) {
            roundNumber++;
            return gameFactory.setCurrentRound(roundNumber, gameId);
        }

        function getCurrentQuiz(gameId) {
            return gameFactory.getCurrentQuiz(gameId);
        }

        function setCurrentQuiz(currentQuiz, gameId) {
            return gameFactory.setCurrentQuiz(currentQuiz, gameId);
        }

        function getCurrentRound(gameId) {
            return gameFactory.getCurrentRound(gameId);
        }
  }
})();
