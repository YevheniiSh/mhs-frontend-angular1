'use strict';
angular.module('configGame')
    .component('configGame', {
        templateUrl: 'admin/game-build/config-game/config-game.html',
        css: 'admin/game-build/config-game/config-game.css',
        controller: ['$location', 'OpenGameServiceFactory', '$routeParams',
            function ($location, OpenGameService, $routeParams) {
                let vm = this;
                let gameId = $routeParams.gameId;
                vm.isCalendarVisible = false;
                vm.isTimeVisible = false;
                vm.saved = false;
                vm.options = {};
                vm.options.minDate = new Date();

                this.location = "";

                vm.$onInit = onInit;

                function onInit() {
                    OpenGameService.getDate(gameId).then((res) => {
                        vm.gameDate = new Date(res);
                    });

                    OpenGameService.getTime(gameId).then((res) => {
                        vm.gameTime = res;
                    });

                    OpenGameService.getLocation(gameId).then((res) => {
                        vm.location = res
                    });

                    getIndexTab()
                }

                function getIndexTab() {
                    vm.tabs = ['teams', 'rounds'];

                    vm.activeTab = Object.keys($location.search()).find(k => /teams|rounds/.test(k));
                    if (vm.activeTab === undefined)
                        vm.activeTab = 'teams';
                }

                vm.updateDateAndLocation = function () {
                    OpenGameService.changeTime(gameId, vm.gameTime);
                    OpenGameService.changeDate(gameId, vm.gameDate);
                    OpenGameService.changeLocation(gameId, vm.location);
                    vm.saved = true;
                };

                vm.onBack = function () {
                    $location.path("/games")
                };

                vm.updateUrlPath = function (key) {
                    $location.search(key);
                };

                vm.ChangeCalendarStatus = function () {
                    if (vm.isCalendarVisible) {
                        vm.isCalendarVisible = false;
                    } else if (vm.isTimeVisible) {
                        vm.isTimeVisible = false;
                        vm.isCalendarVisible = true;
                    }
                    else {
                        vm.isCalendarVisible = true;
                    }
                };

                this.ChangeTimeStatus = function () {
                    if (vm.isTimeVisible) {
                        vm.isTimeVisible = false;
                    }
                    else if (vm.isCalendarVisible) {
                        vm.isTimeVisible = true;
                        vm.isCalendarVisible = false;
                    }
                    else {
                        vm.isTimeVisible = true;
                    }
                };
            }]
    });


