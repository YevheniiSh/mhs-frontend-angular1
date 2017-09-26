(function () {
  angular
    .module('teamList')
    .component('teamList', {
        templateUrl: 'app/admin/team-list/team-list.html',
        css: 'app/admin/team-list/team-list.css',
        controller: TeamList
      }
    );

  TeamList.$inject = ['userAuthService', 'TeamServiceFactory', '$location', 'NotificationService'];

  function TeamList(userService, TeamService, $location, notificationService) {
    let vm = this;
    vm.$onInit = onInit;
    vm.editableTeam = 'none';
    vm.toastConfig = {showCloseButton: true, toastLife: 2000};


    function onInit() {
      TeamService.getAllTeams()
        .then((arr) => {
          vm.teams = [];
          for (let i = 0; i < arr.length; i++) {
            vm.teams.push(setTeamNumberOfGames(arr[i]));
          }
        });
    }

    vm.changeTeamName = function (team) {


      TeamService
        .checkTeamNameCoincidence(team.name)
        .then((res) => {
          if (!res) {
            TeamService
              .changeTeamName(team.$id, team.name)
              .then((res) => {
                vm.teams[vm.teams.indexOf(team)] = setTeamNumberOfGames(team);
                notificationService.showSuccess('TEAM_NAME_CHANGED_ALERT');
              });
          } else {
            notificationService.showError('TEAM_NAME_EXISTS_ALERT');
          }
        });
    };

    vm.showTeamGames = function (teamId) {
      $location.path(`/teams/${teamId}`);
    };

    function setTeamNumberOfGames(team) {
      team.games = calculateNumberOfFinishedGames(team);
      return team;
    };

    function calculateNumberOfFinishedGames(team) {
      let gamesPlayed = 0;

      if (team.games === undefined) {
        gamesPlayed = 0
      } else {
        for (let key in team.games) {
          if (team.games[key].hasOwnProperty('position')) {
            gamesPlayed++
          }
        }
      }
      return gamesPlayed
    }

    vm.auth = false;
    userService.currentUser().then((res) => {
      vm.auth = true;
    }).catch((err) => {
      vm.auth = false;
    });

    vm.selectTeamForEdit = function (teamId) {
      vm.editableTeam = teamId;
    };

    vm.setPensile = function (teamId) {
      vm.pensilId = teamId
    }

  }
})();
