angular.module('applicationForm')
    .component('applicationForm', {
        templateUrl: 'player/application-form/application-form.html',
        css: 'player/application-form/application-form.css',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$routeParams',
            '$location',
            'teamRequestServiceFactory',
            'OpenGameServiceFactory',

            function (TeamService, GameService, $routeParams, $location,
                      TeamRequestService, OpenGameService) {
                let vm = this;
                vm.teamName = "";
                vm.fullName = "";
                vm.phone = "";
                vm.teamSize = 4;

                let gameId = $routeParams.gameId;

                vm.saveRequest = function () {
                    TeamRequestService.save(gameId, {
                        teamName: vm.teamName,
                        fullName: vm.fullName,
                        phone: vm.phone,
                        teamSize: vm.teamSize,
                        status: "unconfirmed", //TODO реализовать методы для изменения состояния
                        teamId: "",         // TODO проверять есть ли такая команда
                        date: new Date().toDateString()
                    });
                    $location.path('/game-list')
                };

                vm.onBack = function () {
                    $location.path(`/game-list`);
                };

                OpenGameService.getOpenGameById(gameId).then((res) => {
                        vm.gameDate = new Date(res.date).toLocaleDateString()
                    }
                )
            }
        ]
    });