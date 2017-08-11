(function () {
    'use strict';
    angular.module('game-list')
        .component('openGameList', {
            templateUrl: 'admin/game-list/open-game-list.html',
            controller: OpenGameList
        });

    OpenGameList.$inject = ['OpenGameServiceFactory', '$location', 'userAuthService'];

    function OpenGameList(openGameFactory, $location, userService) {
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

        vm.registerToGame = function (gameId) {
            console.log(gameId);
            //$location.path('/.../' + gameId)
        };

        vm.startGame = function (gameId) {
            console.log(gameId);
            //$location.path('/.../' + gameId)
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