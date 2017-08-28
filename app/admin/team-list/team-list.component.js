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

        vm.setTeamGames = function (team) {
            if (team.games === undefined) {
                team.games = 0
            } else team.games = Object.keys(team.games).length;
            vm.teams.push(team);
            return team;
        }

        function onInit() {
            TeamService.getAllTeams()
                .then((arr) => {
                    vm.teams = [];

                    // for (let i = 0; i < arr.length; i++) {
                    //     if (arr[i].games === undefined || null) {
                    //         arr[i].size = 0;
                    //         vm.teams.push(arr[i]);
                    //         continue;
                    //     }
                    //     arr[i].size = Object.keys(arr[i].games).length;
                    //     vm.teams.push(arr[i]);
                    // }
                    // for (let i = 0; i < arr.length; i++)
                    //
                    //     TeamService.getTeamGamesCount(vm.teams[i].$id).then((res) => {
                    //         vm.teams[i].games = res
                    //     })
                    for (let i = 0; i < arr.length; i++) {
                        vm.setTeamGames(arr[i]);
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
                                vm.setTeamGames(team);
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

        vm.auth = false;
        userService.currentUser().then((res) => {
            vm.auth = true;
        }).catch((err) => {
            vm.auth = false;
        });
    }
})();