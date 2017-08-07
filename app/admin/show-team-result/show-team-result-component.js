angular.module('showTeamResult')
    .component('showTeamResult', {
        templateUrl: 'admin/show-team-result/show-team-result.html',
        controller: ['ResultServiceFactory', 'RoundStatusService', 'TeamServiceFactory', '$routeParams', '$rootScope', '$location',
            function (ResultService, RoundService, TeamService, $routeParams, $rootScope, $location) {
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

                this.getGameStatistic = function () {
                    $location.path(`/show-result/${$routeParams.gameId}`);
                };
                this.url = $routeParams.gameId;

                ResultService.filter({by: 'teamId', val: $routeParams.teamId}, $routeParams.gameId)
                    .then(parseTeamResult)
                    .then((res) => {
                        this.roundsResult = res;
                        console.log(this.roundsResult);
                    });

                TeamService.getById($routeParams.teamId)
                    .then(team => {
                        this.teamName = team.name;
                    });

                this.gameId = $routeParams.gameId;
                this.teamId = $routeParams.teamId;


                this.showRoundAndQuiz = function (round, quiz) {
                    this.info = "R "+ round + " Q " + quiz + " "+ this.gameId  + " " + this.teamId ;
                };


                this.setTeamResult = function(round, quiz) {
                    let score = parseInt(quiz.score);
                    let quizNum = parseInt(quiz.quizNum);
                    let roundNum = parseInt(round.roundNum);

                    let result = {
                        quiz: quizNum,
                        round: roundNum,
                        score: score,
                        teamId: this.teamId
                    };
                    round.total = parseInt(round.total) + score;
                    ResultService.saveResult(result, this.gameId);
                };

                this.totalColor = function (round) {
                    let total = parseInt(round.total);

                    if(total === 0) {
                        return 'silver-total'
                    } else if (total > 0){
                        return 'green-total'
                    } else {
                        return 'red-total'
                    }
                };
                this.quizColor = function(quiz) {
                    let score = parseInt(quiz.score);

                    if (score === 0) {
                        return 'btn-silver';
                    } else if (score > 0) {
                        return 'btn-success';
                    } else {
                        return 'btn-primary';
                    }
                };

            }]

    });