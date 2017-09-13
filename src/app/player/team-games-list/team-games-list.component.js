(function () {
    angular.module('teamGamesList')
        .component('teamGamesList', {
          templateUrl: 'app/player/team-games-list/team-games-list.html',
          css: 'app/player/team-games-list/team-games-list.css',
            controller: TeamGamesList
        });

    TeamGamesList.$inject = ['$location', '$routeParams', 'TeamServiceFactory', '$window', 'GameServiceFactory'];

    function TeamGamesList($location, $routeParams, teamService, $window, GameServiceFactory) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            vm.teamId = $routeParams.teamId;
            initTeamGames();
            initTeam();
        }

        function initTeamGames() {
            teamService.getTeamGames(vm.teamId)
                .then(games => {
                    initTeamsNumber(games);
                    vm.teamGames = games;
                })
        }

        function initTeamsNumber(games) {
            games.forEach((game) => {
                GameServiceFactory.getGameTeamsNumber(game.$id)
                    .then((teamsNumber) => {
                        game.teamsNumber = teamsNumber;
                    });
            });
        }

        function initTeam() {
            teamService.getById(vm.teamId)
                .then(team => {
                    vm.team = team;
                })
        }

        vm.onClicked = function (gameId) {
            $location.path(`/games/${gameId}/results/${vm.teamId}`);
        };

        vm.onBack = function () {
            $window.history.back()
        }
    }
})();
