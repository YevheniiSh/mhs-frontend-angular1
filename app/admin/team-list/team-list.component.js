(function () {
    angular
        .module('teamList')
        .component('teamList', {
                templateUrl: 'admin/team-list/team-list.html',
                controller: TeamList
            }
        );

    TeamList.$inject = ['userAuthService', 'TeamServiceFactory', '$timeout', '$location'];

    function TeamList(userService, TeamService, $timeout, $location) {
        let vm = this;
        vm.$onInit = onInit;
        vm.showSuccessAlert = false;
        vm.showErrorAlert = false;
        vm.editableTeam = 'none';

        function onInit() {
            TeamService.getAllTeams()
                .then((arr) => {
                    vm.teams = [];
                    for (let i = 0; i < arr.length; i++) {
                        vm.teams.push(setTeamNumberOfGames(arr[i]));
                    }
                });
        }

        function showSuccessAlert() {
            $timeout(() => {
                vm.showSuccessAlert = false;
            }, 2000);
        }

        vm.changeTeamName = function (team) {

            TeamService
                .checkTeamNameCoincidence(team.name)
                .then((res) => {
                    if (!res) {
                        TeamService
                            .changeTeamName(team.$id, team.name)
                            .then((res) => {
                                vm.teams[vm.teams.indexOf(team)] = setTeamNumberOfGames(team)
                                vm.showSuccessAlert = true;
                                vm.showErrorAlert = false;
                                showSuccessAlert();
                            });
                    } else {
                        vm.showErrorAlert = true;
                    }
                });
        };

        vm.hideAlert = function () {
            vm.showSuccessAlert = false;
            vm.showErrorAlert = false;
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

        vm.selectTeamForEdit = function(teamId){
            vm.editableTeam = teamId;
        };

        vm.setPensile = function (teamId) {
            vm.pensilId = teamId

        }

    }
})();