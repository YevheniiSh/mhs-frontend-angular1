angular.module('teamResults')
    .component('teamResults', {
        templateUrl: 'admin/team-results/team-results.html',
        controller: ['userAuthService', 'GameServiceFactory', 'ResultServiceFactory', 'RoundStatusService', 'TeamServiceFactory', '$routeParams', '$rootScope', '$location',
            function (userAuthService, GameService, ResultService, RoundService, TeamService, $routeParams, $rootScope, $location) {
                let vm = this;
                this.$onInit = onInit;
                function onInit() {
                    vm.gameStatus = true;

                    vm.gameId = $routeParams.gameId;
                    vm.teamId = $routeParams.teamId;

                    GameService.getGameStatus(this.gameId).then(status => {
                        if (status === "current") {
                            vm.gameStatus = false;
                            GameService.getDate(status,this.gameId).then(v=>this.date = new Date(v.$value).toLocaleDateString())
                        }
                        if (status === "finished"){
                             vm.gameStatus = true;
                            GameService.getDate(status,this.gameId).then(v=>this.date = new Date(v.$value).toLocaleDateString())
                        }
                    });

                    vm.getResults();
                }

                function parseTeamResult(teamResults) {
                    console.log(teamResults);

                    return RoundService.getRoundNames($routeParams.gameId)
                        .then((rounds) => {
                            let roundsResult = {};
                            teamResults.forEach((quizResult) => {
                                roundsResult[quizResult.round] = {quizzes: {}, total: 0};
                            });
                            teamResults.forEach((quizResult) => {
                                roundsResult[quizResult.round].quizzes[quizResult.quiz] = quizResult.score;
                            });
                            let result = [];
                            for (let round in roundsResult) {
                                let roundQuizzes = [];
                                let totalResult = 0;
                                for (let quiz in roundsResult[round].quizzes) {
                                    roundQuizzes.push({quizNum: quiz, score: roundsResult[round].quizzes[quiz]})
                                    totalResult += roundsResult[round].quizzes[quiz];
                                }
                                result.push({roundNum: round, quizzes: roundQuizzes, total: totalResult.toFixed(1)});
                            }

                            result.forEach((item, index) => {

                                item['roundName'] = rounds[index].name;
                            });

                            return result;
                        });
                }
                vm.showGameResults = function () {
                    $location.path(`/games/${$routeParams.gameId}/results`);
                };
                vm.url = $routeParams.gameId;

                vm.getResults = function () {
                    ResultService.filter({by: 'teamId', val: $routeParams.teamId}, $routeParams.gameId)
                        .then(parseTeamResult)
                        .then((res) => {
                            vm.teamTotal = 0;

                            vm.roundsResult = res
                            angular.forEach(res,(round)=>{
                                if (round.total){
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
                    ResultService.saveResult(result, vm.gameId);
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

            }]
    });