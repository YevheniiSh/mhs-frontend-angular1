angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', function (ResultService, GameService, $routeParams, $rootScope, $location) {

            let gameStatus = $routeParams.gameStatus;

            console.log(gameStatus);
            this.getDetails = function (teamResult) {
                $location.path(`/show-team-result/${$routeParams.gameId}/${teamResult.teamId}/${gameStatus}`);
            };

            function parseTeamsResult(gameResults) {
                let res = [];
                for (let key in gameResults) {
                    res.push(gameResults[key]);
                }
                let roundResult = {};
                res.forEach((quizResult) => {
                    roundResult[quizResult.teamId] = {rounds: {}, total: 0};
                });
                res.forEach((quizResult) => {
                    let roundScore = roundResult[quizResult.teamId].rounds[quizResult.round];
                    roundResult[quizResult.teamId].rounds[quizResult.round] = roundScore + quizResult.score || quizResult.score;
                });
                let result = [];
                for (let team in roundResult) {
                    let teamRounds = [];
                    let totalResult = 0;
                    for (let round in roundResult[team].rounds) {
                        teamRounds.push({roundNumber: round, score: roundResult[team].rounds[round].toFixed(1)});
                        totalResult += roundResult[team].rounds[round];
                    }
                    result.push({teamId: team, rounds: teamRounds, total: totalResult.toFixed(1)});
                }
                return result;
            }

            function setTeamName(score) {
                console.log(gameStatus);
                return GameService.getGameTeams($routeParams.gameId, gameStatus)
                    .then((teams) => {
                        score.forEach(teamScore => {
                            teams.forEach(team => {
                                if (teamScore.teamId === team.teamId) {
                                    teamScore.teamName = team.name;
                                }
                            });
                        });
                        return score;
                    })
            }

            ResultService.getGameResults($routeParams.gameId, gameStatus)
                .then(parseTeamsResult)
                .then(setTeamName)
                .then((result) => {
                    this.results = result;
                    $rootScope.$apply();
                    console.log(result);
                });
        }]

    });