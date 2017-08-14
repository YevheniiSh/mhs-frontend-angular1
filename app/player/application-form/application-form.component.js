(function () {
    angular.module('applicationForm')
        .component('applicationForm', {
            templateUrl: 'player/application-form/application-form.html',
            css: 'player/application-form/application-form.css',
            controller: TeamRegister
        });

    TeamRegister.$inject = ['TeamServiceFactory', 'GameServiceFactory', '$routeParams', '$window', '$location', 'gameRequestServiceFactory', 'OpenGameServiceFactory'];

    function TeamRegister(TeamService, GameService, $routeParams, $window, $location, gameRequestServiceFactory, OpenGameService) {
        let vm = this;
        vm.$onInit = onInit;
        let gameId = $routeParams.gameId;

        function initRegisterForm() {
            vm.teamName = "";
            vm.fullName = "";
            vm.phone = "";
            vm.teamSize = 4;
            vm.submitted = false;
        }

        vm.saveRequest = function () {
            gameRequestServiceFactory.save(gameId, {
                teamName: vm.teamName,
                fullName: vm.fullName,
                phone: vm.phone,
                teamSize: vm.teamSize,
                status: "unconfirmed", //TODO реализовать методы для изменения состояния
                teamId: "",         // TODO проверять есть ли такая команда
                date: new Date().toDateString()
            })
                .then(() => {
                    vm.submitted = true;
                    setTimeout(() => {
                        $window.history.back();
                    }, 2000);

                })
        };

        vm.tets = function () {
            TeamService.getAllTeams()
                .then((res) => {
                    let auto = res.filter((team) => {
                        return team.name.startsWith(vm.teamName);
                    });
                    console.log(auto)
                })
        };

        vm.onBack = function () {
            $window.history.back();
        };

        function onInit() {
            initRegisterForm();
            OpenGameService.getOpenGameById(gameId).then((res) => {
                    vm.gameDate = new Date(res.date).toLocaleDateString()
                }
            )
        }
    }
})();