angular.module('showTeamResult')
    .component('showTeamResult', {
        templateUrl: 'admin/show-team-result/show-team-result.html',
        controller: ['ResultServiceFactory', 'RoundStatusService', 'TeamServiceFactory', '$routeParams', '$rootScope', '$location',
            function (ResultService, RoundService, TeamService, $routeParams, $rootScope, $location) {
                function parseTeamResult(teamResults) {
                    console.log(teamResults);

                    return RoundService.getRoundNames($routeParams.gameId)
                        .then((rounds) => {
                            let res = [];
                            for (let key in teamResults) {
                                res.push(teamResults[key]);
                            }
                            let roundsResult = {};
                            res.forEach((quizResult) => {
                                roundsResult[quizResult.round] = {quizzes: {}, total: 0};
                            });
                            res.forEach((quizResult) => {
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

                            console.log(result);

                            result.forEach((item, index) => {
                                console.log(rounds);

                                item['roundName'] = rounds[index].name;
                            });

                            console.log(result);
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
                    });

                TeamService.getById($routeParams.teamId)
                    .then(team => {
                        this.teamName = team.name;
                    })
            }]

    });