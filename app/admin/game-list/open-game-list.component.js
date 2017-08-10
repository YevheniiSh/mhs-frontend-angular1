(function () {
    'use strict';
    angular.module('game-list')
        .component('openGameList', {
            templateUrl: 'admin/game-list/open-game-list.html',
            controller: OpenGameList
        });

    OpenGameList.$inject = ['GameServiceFactory', '$location', 'userAuthService'];

    function OpenGameList(gameFactory, $location, userService) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {

        };
    }
})();