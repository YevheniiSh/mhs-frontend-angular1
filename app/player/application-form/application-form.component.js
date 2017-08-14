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
            vm.selectedTeam = '';
        }

        function getSelectedTeam() {
            $scope.$watch(() => {
                return vm.selectedTeam;
            }, (newValue) => {
                console.log(newValue);
            });
        }

        vm.saveRequest = function () {
            gameRequestServiceFactory.save(gameId, {
                teamName: vm.selectedTeam.originalObject.name,
                fullName: vm.fullName,
                phone: vm.phone,
                teamSize: vm.teamSize,
                status: "unconfirmed", //TODO реализовать методы для изменения состояния
                teamId: vm.selectedTeam.originalObject.$id,
                date: new Date().toDateString()
            }).then(() => {
                vm.submitted = true;
                setTimeout(() => {
                    $window.history.back();
                }, 2000);

            });
            // console.log(vm.selectedTeam)
        };

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

            getSelectedTeam();
        }
    }
})();