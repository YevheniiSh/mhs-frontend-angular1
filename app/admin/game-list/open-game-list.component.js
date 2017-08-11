(function () {
    'use strict';
    angular.module('game-list')
        .component('openGameList', {
            templateUrl: 'admin/game-list/open-game-list.html',
            controller: OpenGameList
        });

    OpenGameList.$inject = ['OpenGameServiceFactory', 'GameServiceFactory', '$rootScope', '$location', 'userAuthService'];

    function OpenGameList(openGameFactory, gameServiceFactory, $rootScope, $location, userService) {
        let vm = this;
        vm.$onInit = onInit;
        function onInit() {
            openGameFactory.getAllOpenGames().then((games) => {
                vm.openGames = games;
                vm.openGames.forEach((item) => {
                    item.date = new Date(item.date);
                });
            })
        };

        vm.invalid = false;

        vm.registerToGame = function (gameId) {
            console.log(gameId);
            //$location.path('/.../' + gameId)
        };

        vm.startGame = function (game) {
            let gameId = game.$id;
            let rounds = openGameFactory.getRounds(gameId);
            let teams = openGameFactory.getTeams(gameId);
            Promise.all([rounds, teams]).then((res) => {
                console.log(res);
                if (res[0].length < 2) {
                    game.invalid = true;
                    game.error = 'Configurate rounds';
                    $rootScope.$apply();
                } else if (res[1].length < 2) {
                    game.invalid = true;
                    game.error = 'Configurate teams';
                    $rootScope.$apply();
                } else {
                    gameServiceFactory.startGame(gameId);
                    $location.path('/round-status/' + gameId);
                }
            });


        };

        vm.configGame = function (gameId) {
            console.log(gameId);
            $location.path('/config-game/' + gameId)
        };

        vm.auth = false;
        userService.currentUser().then((res) => {
            vm.auth = true;
        }).catch((err) => {
            vm.auth = false;
        });
    }
})();