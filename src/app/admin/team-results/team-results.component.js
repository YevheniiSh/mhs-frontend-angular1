angular.module('teamResults')
    .component('teamResults', {
      templateUrl: 'app/admin/team-results/team-results.html',
        controller: ['userAuthService', 'GameServiceFactory', 'ResultServiceFactory', 'RoundStatusService', 'TeamServiceFactory', '$routeParams', '$rootScope', '$location', '$window',
            function (userAuthService, GameService, ResultService, RoundService, TeamService, $routeParams, $rootScope, $location, $window) {
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

                    TeamService.getById($routeParams.teamId)
                        .then(team => {
                            vm.teamName = team.name;
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

                vm.setTeamResult = function (round, quiz) {
                    let score = parseFloat(quiz.score);
                    let quizNum = parseFloat(quiz.quizNum);
                    let roundNum = parseFloat(round.roundNum);
                    quiz.edit = true;
                    let result = {
                        quiz: quizNum,
                        round: roundNum,
                        score: score,
                        teamId: vm.teamId
                    };

                    ResultService.saveResult(vm.state, result, vm.gameId)
                        .then(() => {
                            vm.getQuiz(round, quiz);
                        });
                };

                vm.getQuiz = function (round, quiz) {
                    let resultKey = [round.roundNum, quiz.quizNum, vm.teamId].join('_');
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

                this.editResults = function () {
                    this.gameStatus = false;
                };

                this.blockEditing = function () {
                    this.gameStatus = true;
                    ResultService.setGameWinner(this.state, vm.gameId);
                    ResultService.setTeamPosition(vm.gameId);
                }

            }]
    });
