(function () {
    'use strict';
    angular.module('game-list')
        .component('openGameList', {
          templateUrl: 'app/admin/game-list/open-game-list.html',
          css: 'app/admin/game-list/open-game-list.css',
            controller: OpenGameList
        });

    OpenGameList.$inject = ['OpenGameServiceFactory', 'GameServiceFactory', '$rootScope', '$location', 'userAuthService', 'gameRequestServiceFactory', '$uibModal','NotificationService'];

    function OpenGameList(openGameFactory, gameServiceFactory, $rootScope, $location, userService, gameRequestService, $uibModal,notificationService) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            openGameFactory.getAllOpenGames().then((games) => {
                vm.openGames = games;
                vm.parseDate();

                vm.openGames.$watch(() => {
                    vm.parseDate();
                });
            })
        }

        vm.parseDate = function () {
            vm.openGames.forEach((item) => {
                item.date = new Date(item.date);
            });
        };

        vm.invalid = false;

        vm.registerToGame = function (gameId) {
            $location.path('games/' + gameId + '/registration')
        };

        vm.startGame = function (game) {
            let gameId = game.$id;
            let rounds = openGameFactory.getRounds(gameId);
            let teams = openGameFactory.getTeams(gameId);
            Promise.all([rounds, teams]).then((res) => {
                if (res[0].length < 2) {
                    game.invalid = true;
                    notificationService.showError('CONFIG_ROUNDS_ERROR');
                } else if (res[1].length < 2) {
                    game.invalid = true;
                    notificationService.showError('CONFIG_TEAMS_ERROR');
                } else {
                    gameServiceFactory.startGame(gameId);
                    $location.path('/games/' + gameId + '/rounds');
                }
            });


        };

        vm.configGame = function (gameId) {
            $location.path('/games/' + gameId + '/config')
        };

        vm.deleteGame = function (game) {
            delete game.isDeleteGameRequested;
            openGameFactory.removeOpenGame(game.$id)
        };

        vm.deleteGameRequest = function (game) {
            game.isDeleteGameRequested = true;
        };

        vm.cancelDeleteGameRequest = function (game) {
            game.isDeleteGameRequested = false;
            delete game.isDeleteGameRequested;
        };

        vm.auth = false;

        userService.currentUser()
            .then(() => {
                vm.auth = true;
            })
            .catch(() => {
                vm.auth = false;
            });

        vm.open = function (gameId, parentSelector) {
            gameRequestService.getAllTeamRequestsByGameId(gameId)
                .then((teams) => {
                    var items = teams;
                    openGameFactory.getDate(gameId)
                        .then((date) => {
                            var gameDate = new Date(date);
                            var parentElem = parentSelector ?
                                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                            vm.modalInstance = $uibModal.open({
                                animation: false,
                                ariaLabelledBy: 'modal-title',
                                ariaDescribedBy: 'modal-body',
                                component: 'modalComponent',
                                appendTo: parentElem,
                                resolve: {
                                    items: function () {
                                        return items;
                                    },
                                    date: function () {
                                        return gameDate;
                                    },
                                  cancel: function () {
                                    return cancel;
                                  }}
                            });
                        });
                })
        };

        function cancel() {
          vm.modalInstance.close();
        }
    }
})();
