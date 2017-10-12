angular.module('teamResults')
    .component('teamResults', {
      templateUrl: 'app/admin/team-results/team-results.html',
      css: 'app/admin/team-results/team-results.css',
        controller: [
          'userAuthService',
          'GameServiceFactory',
          'ResultServiceFactory',
          'RoundStatusService',
          'TeamServiceFactory',
          '$routeParams',
          '$rootScope',
          '$location',
          '$window',
          'NotificationService',
            function (userAuthService, GameService, ResultService, RoundService, TeamService, $routeParams, $rootScope, $location, $window, NotificationService) {
                let vm = this;
                this.$onInit = onInit;

                function onInit() {
                    vm.gameStatus = true;

                    vm.gameId = $routeParams.gameId;
                    vm.teamId = $routeParams.teamId;

                    vm.auth = false;
                    userAuthService.currentUser().then((res) => {
                        vm.auth = true;
                    }).catch((err) => {
                        vm.auth = false;
                    });

                    ResultService.isGameInFinishedSeason(vm.gameId).then((res) => {
                        vm.isGameInFinishedSeason = res
                    });

                    GameService.getGameStatus(this.gameId).then(status => {
                        if (status === "current") {
                            vm.state = status;
                            vm.gameStatus = false;
                            GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString())
                        }
                        if (status === "finished") {
                            vm.state = status;
                            vm.gameStatus = true;
                            GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString())
                        }
                    });

                    vm.getResults();
                }

                vm.showGameResults = function () {
                    $window.history.back();
                };

                vm.getResults = function () {
                    ResultService.filter({by: 'teamId', val: $routeParams.teamId}, $routeParams.gameId)
                        .then(teamResults => {
                            return ResultService.parseTeamResult(teamResults, vm.gameId)
                        })
                        .then((res) => {
                            vm.roundsResult = res;
                            vm.setTeamTotal();
                        });

                    GameService.getGameTeams(vm.gameId)
                        .then((res) => {
                            console.log(res);
                            res.forEach((item) => {
                                if(item.teamId === $routeParams.teamId){
                                    vm.teamName = item.name;
                                }
                            })
                        });
                };

                vm.setTeamTotal = function () {
                    vm.teamTotal = 0;
                    angular.forEach(vm.roundsResult, (round) => {
                        if (round.total) {
                            vm.teamTotal += parseFloat(round.total);
                        }
                    });
                };

              let editedQuizzes = [];

              function configureResult(roundNum, quiz) {

                let score = parseFloat(quiz.score);
                let quizNum = parseFloat(quiz.quizNum);
                let roundNumber = parseFloat(roundNum);
                let weightOfResponse = null;

                if (quiz.hasOwnProperty("weightOfResponse"))
                  weightOfResponse = quiz.weightOfResponse;

                let result = {
                  quiz: quizNum,
                  round: roundNumber,
                  score: score,
                  teamId: vm.teamId,
                  weightOfResponse: weightOfResponse
                };
                return result
              }

              vm.setTeamResult = function (roundNum, quiz) {
                addQuizToSaveQueue(roundNum, quiz)
              };

              function addQuizToSaveQueue(roundNum, quiz) {
                let isItemUpdated = updateQuiz(roundNum, quiz)
                if (!isItemUpdated)
                  editedQuizzes.push({quiz: quiz, roundNum: roundNum})
              }

              function updateQuiz(roundNum, quiz) {
                let isItemUpdated = false;
                for (let i in editedQuizzes) {
                  if (editedQuizzes[i].roundNum === roundNum && editedQuizzes[i].quiz.quizNum === quiz.quizNum) {
                    editedQuizzes[i] = {quiz: quiz, roundNum: roundNum};
                    isItemUpdated = true
                  }
                }
                return isItemUpdated
              }

              function saveResult(result) {
                ResultService.saveResult(vm.state, result, vm.gameId)
                  .then(() => {
                    vm.getQuiz(result.round, result.quiz);
                  });
              }

              vm.getQuiz = function (roundNum, quizNum) {
                let resultKey = [roundNum, quizNum, vm.teamId].join('_');
                    ResultService.getQuiz(vm.gameId, resultKey)
                        .then((res) => {
                            vm.setQuizResult(res);
                            vm.setTeamTotal();
                        })
                };

                vm.setQuizResult = function (res) {
                    vm.roundsResult[res.round - 1].quizzes[res.quiz - 1].score = res.score;
                    vm.roundsResult[res.round - 1].total = 0;
                    vm.roundsResult[res.round - 1].quizzes.forEach((item) => {
                        vm.roundsResult[res.round - 1].total += item.score;
                    });
                };

                vm.selectAllContent = function ($event) {
                    $event.target.select();
                };

                this.totalColor = function (round) {
                    let total = parseFloat(round.total);
                    if (total === 0) {
                        return 'silver-total'
                    } else if (total > 0) {
                        return 'text-success'
                    } else {
                        return 'text-danger'
                    }
                };

              vm.editResults = function () {
                vm.gameStatus = false;
                };

              vm.saveChanges = function () {
                for (let quiz of editedQuizzes) {
                  if (quiz.quiz.real) {
                    saveResult(configureResult(quiz.roundNum, quiz.quiz))
                  } else {
                    let resultKey = [quiz.roundNum, quiz.quiz.quizNum, vm.teamId].join('_');
                    ResultService.deleteResult(vm.gameId, resultKey)
                  }
                  quiz.quiz.edited = false
                }
                editedQuizzes = [];
                if (vm.state === "finished") {
                  vm.gameStatus = true;
                  ResultService.setGameWinner(this.state, vm.gameId);
                  ResultService.setTeamPosition(vm.gameId);
                }
                NotificationService.showSuccess('CHANGES_SAVED');
              };

              vm.discardChanges = function () {
                vm.getResults();

                editedQuizzes = [];
                if (vm.state === "finished")
                  vm.gameStatus = true;
              };

              vm.isEmptyEditedQuizzes = function () {
                return (editedQuizzes.length !== 0)
              }
            }]
    });
