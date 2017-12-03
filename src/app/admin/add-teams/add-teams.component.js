(function () {
  angular.module('addTeams')
    .component('addTeams', {
      templateUrl: 'app/admin/add-teams/add-teams.html',
      css: 'app/admin/add-teams/add-teams.css',
      controller: AddTeams
    });

  AddTeams.$inject = ['teamRequestService',
    'gameRequestServiceFactory',
    'OpenGameServiceFactory',
    'TeamServiceFactory',
    'GameServiceFactory',
    '$location',
    '$routeParams',
    '$window'];

  function AddTeams(teamRequestService, gameRequestService, openGameService, teamService, gameService, $location, $routeParams, $window) {
    let vm = this;
    vm.$onInit = onInit;

    function onInit() {
      vm.gameId = $routeParams.gameId;
      openGameService.getOpenGameById(vm.gameId)
        .then((res) => {
          vm.game = res;
        });
      vm.getRequests();
      vm.getTeams();
    }

    vm.addTeamToGame = function (request) {
      let team = convertRequestToTeam(request);
      if (!request.teamId && !vm.game.isPrivate) {
        addNewTeamOnGame(team, request);
      } else if (request.teamId && !vm.game.isPrivate) {
        addExistTeamOnGame(team, request);
      } else if (vm.game.isPrivate) {
        addTeamOnPrivateGame(team,request);
      }
    };

    function convertRequestToTeam(request){
      return {
        requestId: request.$id,
        fullName: request.fullName,
        phone: request.phone,
        teamSize: request.teamSize,
        name: request.teamName,
        key: request.teamId
      };
    }

    function addTeamOnPrivateGame(team,request){
      gameService.addTeamToGame(vm.gameId,team);
      gameRequestService.setConfirmedStatus(vm.gameId, request.$id)
    }

    function addExistTeamOnGame(team, request){
      gameService.addTeamToGame(vm.gameId, team)
        .then((id) => {
          teamService.addGameToTeam(id, vm.gameId);
        });
      teamRequestService.save(request);
      gameRequestService.setConfirmedStatus(vm.gameId, request.$id);
    }

    function addNewTeamOnGame(team, request){
      teamService.save({name: request.teamName})
        .then(res => {
          team.key = res.key;

          gameService.addTeamToGame(vm.gameId, team).then((id) => {
            teamService.addGameToTeam(id, vm.gameId);
          });
          gameRequestService.setConfirmedStatus(vm.gameId, request.$id);
          request.teamId = res.key;
          gameRequestService.updateTeamId(vm.gameId, request)
          teamRequestService.save(request);
        })
    }

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

  }
})();
