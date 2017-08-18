(function () {
    angular.module('teamGamesList')
        .component('teamGamesList', {
            templateUrl: "player/team-games-list/team-games-list.html",
            css: "player/team-games-list/team-games-list.css",
            controller: TeamGamesList
        })
    TeamGamesList.$inject = [];

    function TeamGamesList() {
        let vm = this;
    }
})()