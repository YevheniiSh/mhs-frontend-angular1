angular.module('addTeams')
    .component('addTeams', {
        templateUrl: 'admin/add-teams/add-teams.html',
        css: 'admin/add-teams/add-teams.css',
        controller: ['teamRequestServiceFactory',
            'OpenGameServiceFactory',
            'TeamServiceFactory',
            'GameServiceFactory',
            '$location',
            '$routeParams',
            function (teamRequestService, openGameService,teamService,gameService, $location, $routeParams) {
                let vm = this;
                vm.gameId = $routeParams.gameId;
                vm.$onInit = onInit;

                function onInit() {
                    vm.getRequests();
                    vm.getTeams()
                }

                vm.addTeamToGame = function(request){
                    if(!request.teamId){
                        teamService.save({name:request.teamName})
                            .then(res=>{
                                gameService.addTeamToGame(vm.gameId,res)
                                teamRequestService.setConfirmedStatus(vm.gameId,request.$id)
                            })
                    }


                }

                vm.getRequests = function () {
                    teamRequestService.getAllTeamRequestsByGameId(vm.gameId)
                        .then((res) => {
                            vm.requests = res;
                        })
                };

                vm.getTeams = function () {
                    openGameService.getTeams(vm.gameId)
                        .then(res=>{
                            console.log(res);
                            vm.teams = res;
                        })

                }

                vm.archivateRequest = function (requestId) {
                    teamRequestService.setArchivedStatus(vm.gameId, requestId)
                }

                vm.unArchivateRequest = function (requestId) {
                    teamRequestService.setUnconfirmedStatus(vm.gameId, requestId)
                };

                vm.unConfirmRequest = function (requestId) {
                    gameService.removeTeamFromGame(vm.gameId, requestId);
                    teamRequestService.setUnconfirmedStatus(vm.gameId, requestId);
                }
            }]

    })
;