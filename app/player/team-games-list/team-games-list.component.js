(function () {
    angular.module('teamGamesList')
        .component('teamGamesList', {
            templateUrl: "player/team-games-list/team-games-list.html",
            css: "player/team-games-list/team-games-list.css",
            controller: TeamGamesList
        })
    TeamGamesList.$inject = ['$location','$routeParams','TeamServiceFactory'];

    function TeamGamesList($location,$routeParams,teamService) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            vm.teamId = $routeParams.teamId;
            teamService.getTeamGames(vm.teamId)
                .then(games=>{
                    vm.teamGames = games;
                })
        }


    }
})()