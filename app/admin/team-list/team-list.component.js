(function () {
    angular
        .module('teamList')
        .component('teamList', {
                templateUrl: 'admin/team-list/team-list.html',
                controller: TeamList
            }
        );

    TeamList.$inject = ['TeamServiceFactory', '$timeout'];

    function TeamList(TeamService, $timeout) {
        let vm = this;
        vm.$onInit = onInit;
        vm.showAlert = false;

        function onInit() {
            TeamService.getAllTeams()
                .then((arr) => {
                    vm.teams = arr;
                });
        }

        vm.changeTeamName = function (team) {
            showAlert();
            TeamService.changeTeamName(team.$id, team.name);
        };

        function showAlert() {
            vm.showAlert = true;
            $timeout(() => {
                vm.showAlert = false;
            }, 2000);
        }

        vm.hideAlert = function () {
            vm.showAlert = false;
        }
    }
})();