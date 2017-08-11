angular.module('addTeams')
    .component('addTeams', {
        templateUrl: 'admin/add-teams/add-teams.html',
        css: 'admin/add-teams/add-teams.css',
        controller: ['teamRequestServiceFactory',
            '$location',
            '$routeParams',
            function (teamRequestService, $location,$routeParams) {
                let vm = this;
                vm.gameId = $routeParams.gameId;
                vm.$onInit = onInit;
                function onInit() {
                    vm.getRequests();
                }

                vm.getRequests = function () {
                    teamRequestService.getAllTeamRequestsByGameId(vm.gameId)
                        .then((res)=>{
                            vm.requests=res;
                        })
                };
            }]

    })
;