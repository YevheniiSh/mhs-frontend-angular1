'use strict';
angular.module('configGame')
    .component('configGame', {
        templateUrl: 'admin/game-build/config-game/config-game.html',
        css: 'admin/game-build/config-game/config-game.css',
        controller: ['$location', 'OpenGameServiceFactory', '$routeParams', '$timeout', '$locale', 'convertServiceFactory',
            function ($location, OpenGameService, $routeParams, $timeout, $locale, convertService) {
                let vm = this;
                let gameId = $routeParams.gameId;
                vm.isCalendarVisible = false;
                vm.isTimeVisible = false;
                vm.saved = false;
                vm.options = {};
                vm.options.minDate = new Date();
                vm.options.startingDay = $locale.DATETIME_FORMATS.DAY.FIRSTDAYOFWEEK = 1;
                vm.isMeridian = false;
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

                vm.getTimeForView = function () {
                    return convertService.convertTimeForView(vm.gameTime)
                };

                vm.updateDateAndLocation = function () {
                    OpenGameService.changeLocation(gameId, vm.location);
                    OpenGameService.changeDate(gameId, vm.gameDate);
                    OpenGameService.changeTime(gameId, vm.gameTime);
                    vm.saved = true;
                };

                vm.onBack = function () {
                    $location.path("/games")
                };

                vm.updateUrlPath = function (key) {
                    $location.search(key);
                };

                vm.changeLocation = function () {
                    saveLocation();
                };

                function saveLocation() {
                    OpenGameService.changeLocation(gameId, vm.location).then(() => {
                        vm.locationSaved = true;
                        $timeout(function () {
                            vm.locationSaved = false;
                        }, 1000)

                    })
                }

                function saveDate() {
                    OpenGameService.changeDate(gameId, vm.gameDate).then(() => {
                        vm.dateSaved = true;
                        $timeout(function () {
                            vm.dateSaved = false;
                        }, 1000)

                    });
                }

                function saveTime() {
                    OpenGameService.changeTime(gameId, vm.gameTime).then(() => {
                        vm.timeSaved = true;
                        $timeout(function () {
                            vm.timeSaved = false;
                        }, 1000)

                    });
                }

                vm.openCalendarPiker = function () {
                    if (!isCalendarPikerOpen())
                        vm.isCalendarVisible = true;
                };

                vm.openTimePiker = function () {
                    if (!isTimePikerOpen())
                        vm.isTimeVisible = true;
                };

                vm.closeCalendarPiker = function () {
                    isCalendarPikerOpen()
                };

                vm.closeTimePiker = function () {
                    isTimePikerOpen()
                };


                function isTimePikerOpen() {
                    if (vm.isTimeVisible) {
                        saveTime();
                        vm.isTimeVisible = false;
                        return true
                    }
                    return false

                }

                function isCalendarPikerOpen() {
                    if (vm.isCalendarVisible) {
                        saveDate();
                        vm.isCalendarVisible = false;
                        return true
                    }
                    return false
                }
            }]
    });


