angular.module('addTeams')
    .component('addTeams', {
      templateUrl: 'app/admin/add-teams/add-teams.html',
      css: 'app/admin/add-teams/add-teams.css',
        controller: ['teamRequestService','gameRequestServiceFactory',
            'OpenGameServiceFactory',
            'TeamServiceFactory',
            'GameServiceFactory',
            '$location',
            '$routeParams',
            '$window',
            function (teamRequestService,gameRequestService, openGameService, teamService, gameService, $location, $routeParams, $window) {
                let vm = this;
                vm.gameId = $routeParams.gameId;
                vm.$onInit = onInit;

                function onInit() {
                    vm.getRequests();
                    vm.getTeams();
                }

                vm.addTeamToGame = function (request) {
                    if (!request.teamId) {
                        teamService.save({name: request.teamName})
                            .then(res => {
                                res.requestId = request.$id;
                                res.fullName = request.fullName;
                                res.phone = request.phone;
                                res.teamSize = request.teamSize;
                                gameService.addTeamToGame(vm.gameId, res).then((id) => {
                                    teamService.addGameToTeam(id, vm.gameId);
                                });
                                gameRequestService.setConfirmedStatus(vm.gameId, request.$id);
                                request.teamId = res.key;
                                gameRequestService.updateTeamId(vm.gameId, request)
                                teamRequestService.save(request)
                            })
                    } else {
                        gameService.addTeamToGame(vm.gameId,
                            {
                                name: request.teamName,
                                requestId: request.$id,
                                key: request.teamId,
                                fullName: request.fullName,
                                teamSize: request.teamSize,
                                phone: request.phone
                            }).then((id) => {
                            teamService.addGameToTeam(id, vm.gameId);
                        });
                        teamRequestService.save(request)
                        gameRequestService.setConfirmedStatus(vm.gameId, request.$id)
                    }
                };

                vm.getRequests = function () {
                    gameRequestService.getAllTeamRequestsByGameId(vm.gameId)
                        .then((res) => {
                            vm.requests = res;
                        })
                };

                vm.getTeams = function () {
                    openGameService.getTeams(vm.gameId)
                        .then(res => {
                            vm.teams = res;
                        })

                };

                vm.archivateRequest = function (requestId) {
                    gameRequestService.setArchivedStatus(vm.gameId, requestId)
                };

                vm.unArchivateRequest = function (requestId) {
                    gameRequestService.setUnconfirmedStatus(vm.gameId, requestId)
                };

                vm.unConfirmRequest = function (team) {
                    gameService.removeTeamFromGame(vm.gameId, team.$id);
                    teamService.removeGameFromTeam(team.$id, vm.gameId);
                    gameRequestService.setUnconfirmedStatus(vm.gameId, team.requestId);
                };

                vm.updateTeamSize = function (teamId, numberOfPlayers) {
                    if (numberOfPlayers) {
                        openGameService.updateTeamSize(vm.gameId, teamId, numberOfPlayers);
                    }
                };

                vm.printTeams = function () {
                    $window.open($window.location.origin + `/#!/games/${vm.gameId}/print`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
                };

            }]

    })
;
