(function () {
    angular
        .module('teamList')
        .component('teamList', {
                templateUrl: 'admin/team-list/team-list.html',
                controller: TeamList
            }
        );

    TeamList.$inject = ['TeamServiceFactory', '$timeout','$location'];

    function TeamList(TeamService, $timeout, $location) {
        let vm = this;
        vm.$onInit = onInit;
        vm.showSuccessAlert = false;
        vm.showErrorAlert = false;

        function onInit() {
            TeamService.getAllTeams()
                .then((arr) => {
                    vm.teams = arr;
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
                            .then(() => {
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
        }

        vm.showTeamGames=function(teamId){
            $location.path(`/teams/${teamId}`);
        }
    }
})();