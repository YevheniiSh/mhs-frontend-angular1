(function () {
    angular.module('teamResults')
        .component('teamResults', {
            templateUrl: 'admin/team-results/team-results.html',
            controller: TeamResultsController
        });

    TeamResultsController.$inject = ['userAuthService', 'GameServiceFactory', 'ResultServiceFactory', 'TeamServiceFactory', '$routeParams', '$window',];

    function TeamResultsController(userAuthService, GameService, ResultService, TeamService, $routeParams, $window) {
        let vm = this;
        this.$onInit = onInit;

        function onInit() {
            vm.gameStatus = true;

            vm.gameId = $routeParams.gameId;
            vm.teamId = $routeParams.teamId;

            vm.auth = false;
            userAuthService.currentUser().then(() => {
                vm.auth = true;
            }).catch(() => {
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
                .then(teamResults => {
                    return ResultService.parseTeamResult(teamResults, vm.gameId)
                })
                .then((res) => {
                    vm.teamTotal = 0;

                    vm.roundsResult = res;
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
            if (quiz.score == undefined || null) return;
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
        };

        vm.totalColor = function (round) {
            let total = parseFloat(round.total);
            if (total === 0) {
                return 'silver-total'
            } else if (total > 0) {
                return 'text-success'
            } else {
                return 'text-danger'
            }
        };
        vm.quizColor = function (quiz) {
            let score = parseFloat(quiz.score);

            if (score === 0) {
                return 'btn-silver';
            } else if (score > 0) {
                return 'btn-success';
            } else {
                return 'btn-danger';
            }
        };

        vm.editResults = function () {
            this.gameStatus = false;
        };

        vm.blockEditing = function () {
            this.gameStatus = true;
            ResultService.setGameWinner(this.state, vm.gameId);
            ResultService.setTeamsResults(vm.gameId);
        }
    }
})();