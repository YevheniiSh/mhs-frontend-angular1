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
    }
})();