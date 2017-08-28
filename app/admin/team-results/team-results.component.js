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

                vm.showGameResults = function () {
                    $window.history.back();
                };
                vm.url = $routeParams.gameId;

                vm.getResults = function () {
                    ResultService.filter({by: 'teamId', val: $routeParams.teamId}, $routeParams.gameId)
                        .then(teamResults=>{
                            return ResultService.parseTeamResult(teamResults, vm.gameId)
                        })
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
                    quiz.edit = true;
                    let result = {
                        quiz: quizNum,
                        round: roundNum,
                        score: score,
                        teamId: vm.teamId
                    };

                    ResultService.saveResult(vm.state, result, vm.gameId).then(() => {
                        vm.getResult(round, quiz);
                    });
                };

                vm.getResult = function (round, quiz) {
                    let resultKey = [round.roundNum, quiz.quizNum, vm.teamId].join('_');
                    ResultService.getResult(vm.gameId, resultKey).then((res) => {
                        console.log(res);
                        console.log(vm.roundsResult);
                        vm.roundsResult[res.round - 1].quizzes[res.quiz - 1].score = res.score;
                        vm.roundsResult[res.round - 1].total = 0;
                        vm.roundsResult[res.round - 1].quizzes.forEach((item) => {
                            vm.roundsResult[res.round - 1].total += item.score;
                        })

                        vm.teamTotal = 0;

                        angular.forEach(vm.roundsResult, (r) => {
                            if (r.total) {
                                vm.teamTotal += parseFloat(r.total);
                            }
                        });
                    })
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
                    ResultService.setTeamsResults(vm.gameId);
                }

            }]
    });