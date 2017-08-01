angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', function (ResultService, GameService, $routeParams, $rootScope, $location) {

            this.getDetails = function (teamResult) {
                $location.path(`/show-team-result/${$routeParams.gameId}/${teamResult.teamId}`);
            }

            function parseTeamsResult(gameResults) {
                let res = [];
                for (let key in gameResults) {
                    res.push(gameResults[key]);
                }
                let roundResult = {};
                res.forEach((quizResult) => {
                    roundResult[quizResult.teamId] = {rounds: {}, total: 0};
                })
                res.forEach((quizResult) => {
                    let roundScore = roundResult[quizResult.teamId].rounds[quizResult.round];
                    roundResult[quizResult.teamId].rounds[quizResult.round] = roundScore + quizResult.score || quizResult.score;
                })
                let result = [];
                for (let team in roundResult) {
                    let teamRounds = [];
                    let totalResult = 0;
                    for (let round in roundResult[team].rounds) {
                        teamRounds.push({roundNumber: round, score: roundResult[team].rounds[round]});
                        totalResult += roundResult[team].rounds[round];
                    }
                    result.push({teamId: team, rounds: teamRounds, total: totalResult.toFixed(1)});
                }
                return result;
            }

            function setTeamName(score) {
                return GameService.getGameTeams($routeParams.gameId)
                    .then((teams) => {
                        score.forEach(teamScore => {
                            teams.forEach(team => {
                                if (teamScore.teamId === team.teamId) {
                                    teamScore.teamName = team.name;
                                };
                            });
                        })
                        return score;
                    })
            }

            ResultService.getGameResults($routeParams.gameId)
                .then(parseTeamsResult)
                .then(setTeamName)
                .then((result) => {
                    this.results = result;
                    $rootScope.$apply();
                    console.log(result);
                });
        }]

    });