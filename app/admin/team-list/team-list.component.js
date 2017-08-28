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

        function onInit() {
            TeamService.getAllTeams()
                .then((arr) => {
                    vm.teams = [];
                    for (let i = 0; i < arr.length; i++) {
                        vm.teams.push(getTeamWithGames(arr[i]));
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
                                vm.teams[vm.teams.indexOf(team)] = getTeamWithGames(team)
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

        function getTeamWithGames(team) {
            if (team.games === undefined) {
                team.games = 0
            } else team.games = Object.keys(team.games).length;
            return team;
        };
        vm.auth = false;
        userService.currentUser().then((res) => {
            vm.auth = true;
        }).catch((err) => {
            vm.auth = false;
        });
    }
})();