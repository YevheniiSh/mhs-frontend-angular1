angular.module('addTeams')
    .component('printTeams', {
        templateUrl: 'admin/add-teams/print-teams/print-teams.html',
        css: 'admin/add-teams/print-teams/print-teams.css',
        controller: ['OpenGameServiceFactory', '$routeParams', '$timeout', '$window',

            function (openGameService, $routeParams, $timeout, $window) {
                let vm = this;
                let gameId = $routeParams.gameId;

                openGameService.getTeams(gameId)
                    .then(res => {
                        vm.teams = res;

                    })
                    .then(() => {
                        $timeout(function () {
                            window.print();
                            window.close();
                        })
                    })
            }]
    });