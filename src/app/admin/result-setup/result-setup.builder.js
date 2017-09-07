'use strict';
(function () {
  angular
    .module('resultSetup')
    .factory('resultSetupBuilder', resultSetupBuilder);

  function resultSetupBuilder() {
    let obj = {};

    return {
      addQuiz: addQuiz,
      addRound: addRound,
      addTeamId: addTeamId,
      addScore: addScore,
      addValue: addValue,
      getResult: getResult
    };

    function addValue(name, val) {
      obj[name] = val;
      return this;
    }

    function addScore(score) {
      addValue('score', score);
      return this;
    }

    function addTeamId(teamId) {
      addValue('teamId', teamId);
      return this;
    }

    function addRound(round) {
      addValue('round', round);
      return this;
    }

    function addQuiz(quiz) {
      addValue('quiz', quiz);
      return this;
    }

    function getResult() {
      let res = angular.copy(obj);
      obj = {};
      return res;
    }
  }
})();
