(function () {
    angular.module('applicationForm')
        .component('applicationForm', {
            templateUrl: 'player/application-form/application-form.html',
            css: 'player/application-form/application-form.css',
            controller: TeamRegister
        });

    TeamRegister.$inject = ['TeamServiceFactory', 'GameServiceFactory', '$routeParams', '$window', '$location', 'gameRequestServiceFactory', 'OpenGameServiceFactory', '$scope'];

    function TeamRegister(TeamService, GameService, $routeParams, $window, $location, gameRequestServiceFactory, OpenGameService, $scope) {
        let vm = this;
        vm.$onInit = onInit;
        let gameId = $routeParams.gameId;

        function initRegisterForm() {
            vm.teamName = '';
            vm.fullName = '';
            vm.phone = '';
            vm.teamSize = 4;
            vm.submitted = false;
            vm.selectedTeam = {};
        }

        function watchSelectedTeam() {
            $scope.$watch(() => {
                return vm.selectedTeam;
            }, (team) => {
                // console.log(team);
            });
        }

        vm.getTeamName = function (teamName) {
            vm.teamName = teamName;
        };

        vm.saveRequest = function () {
            let team = {
                fullName: vm.fullName,
                phone: vm.phone,
                teamSize: vm.teamSize,
                status: "unconfirmed",
                date: new Date().toDateString()
            };

            if (vm.selectedTeam === undefined) {
                TeamService
                    .checkTeamNameCoincidence(vm.teamName)
                    .then((res) => {
                        if (res) {
                            vm.teams.forEach((teamFromAllTeams) => {
                                if (teamFromAllTeams.name === vm.teamName) {
                                    team.teamName = teamFromAllTeams.name;
                                    team.teamId = teamFromAllTeams.$id;
                                }
                            });
                            saveTeam(team);
                        } else {
                            team.teamName = vm.teamName;
                            TeamService.save({name: vm.teamName})
                                .then((res) => {
                                    team.teamId = res.key;
                                });
                            saveTeam(team);
                        }
                    });
                return;
            }

            if (Object.keys(vm.selectedTeam).length !== 0) {
                team.teamName = vm.selectedTeam.originalObject.name;
                team.teamId = vm.selectedTeam.originalObject.$id;
                saveTeam(team);
            }
        };

        function saveTeam(team) {
            gameRequestServiceFactory.save(gameId, team)
                .then(() => {
                    vm.submitted = true;
                    setTimeout(() => {
                        $window.history.back();
                    }, 2000);
                });
        }

        vm.onBack = function () {
            $window.history.back();
        };

        function getGameDate() {
            OpenGameService
                .getOpenGameById(gameId)
                .then((res) => {
                        vm.gameDate = new Date(res.date).toLocaleDateString()
                    }
                );
        }

        function getTeams() {
            TeamService
                .getAllTeams()
                .then((res) => {
                    vm.teams = res;
                });
        }

        function onInit() {
            initRegisterForm();

            getGameDate();

            getTeams();

            watchSelectedTeam();
        }
    }
})();