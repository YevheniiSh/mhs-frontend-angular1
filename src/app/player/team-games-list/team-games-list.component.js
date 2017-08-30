(function () {
    angular.module('teamGamesList')
        .component('teamGamesList', {
          templateUrl: 'app/player/team-games-list/team-games-list.html',
            controller: TeamGamesList
        });

    TeamGamesList.$inject = ['$location', '$routeParams', 'TeamServiceFactory','$window'];

    function TeamGamesList($location, $routeParams, teamService,$window) {
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
                    vm.teamGames = games;
                })
        }

        function initTeam() {
            teamService.getById(vm.teamId)
                .then(team => {
                    vm.team = team;
                })
        }

        vm.onClicked = function (gameId) {
            $location.path(`/games/${gameId}/results/${vm.teamId}`);
        }

        vm.onBack = function (){
            $window.history.back()
        }
    }
})();
