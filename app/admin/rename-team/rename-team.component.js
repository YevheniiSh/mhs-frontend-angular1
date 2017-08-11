(function () {
    angular
        .module('renameTeam')
        .component('renameTeam', {
            templateUrl: 'admin/rename-team/rename-team.html',
            css: 'admin/rename-team/rename-team.html',
            controller: RenameTeam
        });

    RenameTeam.$inject = ['TeamServiceFactory'];

    function RenameTeam(TeamServiceFactory) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {

        }

        vm.changeTeamName = function (teamId, newTeamName) {
            TeamServiceFactory.changeTeamName(teamId, newTeamName)
                .then((res) => {
                    // console.log(res)
                })
        };
    }
})();