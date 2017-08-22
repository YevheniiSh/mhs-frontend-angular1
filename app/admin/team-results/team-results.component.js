angular.module('teamResults')
    .component('teamResults', {
        templateUrl: 'admin/team-results/team-results.html',
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

                function parseTeamResult(teamResults) {
                    let roundResult = {};
                    let parsedResult = [];
                    return RoundService.getRounds(vm.gameId)
                        .then(rounds => {
                            return GameService.getCurrentRound(vm.gameId)
                                .then((currenRound) => {
                                    for (let i = 0; i < currenRound - 1; i++) {
                                        roundResult[i + 1] = {
                                            roundNum: i + 1,
                                            roundName: rounds[i].name,
                                            quizzes: [],
                                            total: 0
                                        };
                                        for (let j = 1; j <= rounds[i].numberOfQuestions; j++) {
                                            roundResult[i + 1].quizzes.push({quizNum: j, score: 0})
                                        }
                                    }
                                    teamResults.forEach(quizResult => {
                                        roundResult[quizResult.round].quizzes[quizResult.quiz-1].score = quizResult.score;
                                    })
                                    for (let round in roundResult) {
                                        roundResult[round].total = roundResult[round].quizzes.reduce((sum, current) => {
                                            return sum + current.score;
                                        }, 0)
                                    }
                                    for(let round in roundResult){
                                        parsedResult.push(roundResult[round]);
                                    }
                                    return parsedResult;
                                })
                        })
                }

                vm.showGameResults = function () {
                    $window.history.back();
                };
                vm.url = $routeParams.gameId;

                vm.getResults = function () {
                    ResultService.filter({by: 'teamId', val: $routeParams.teamId}, $routeParams.gameId)
                        .then(parseTeamResult)
                        .then((res) => {
                            vm.teamTotal = 0;

                            vm.roundsResult = res
                            angular.forEach(res, (round) => {
                                if (round.total) {
                                    vm.teamTotal += parseFloat(round.total);
                                }
                            });
                        });

                    TeamService.getById($routeParams.teamId)
                        .then(team => {
                            vm.teamName = team.name;
                        });
                };

                vm.setTeamResult = function (round, quiz) {
                    let score = parseFloat(quiz.score);
                    let quizNum = parseFloat(quiz.quizNum);
                    let roundNum = parseFloat(round.roundNum);

                    let result = {
                        quiz: quizNum,
                        round: roundNum,
                        score: score,
                        teamId: vm.teamId
                    };

                    ResultService.saveResult(vm.state, result, vm.gameId);
                    vm.getResults();
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
                this.quizColor = function (quiz) {
                    let score = parseFloat(quiz.score);

                    if (score === 0) {
                        return 'btn-silver';
                    } else if (score > 0) {
                        return 'btn-success';
                    } else {
                        return 'btn-danger';
                    }
                };

                this.editResults = function () {
                    this.gameStatus = false;
                }

                this.blockEditing = function () {
                    this.gameStatus = true;
                    ResultService.setGameWinner(this.state, vm.gameId);
                    ResultService.setTeamsResults(vm.gameId);
                }

            }]
    });