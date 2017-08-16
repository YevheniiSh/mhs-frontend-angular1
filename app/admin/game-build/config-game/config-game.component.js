'use strict';
angular.module('configGame')
    .component('configGame', {
        templateUrl: 'admin/game-build/config-game/config-game.html',
        css: 'admin/game-build/config-game/config-game.css',
        controller: ['$location',
            function ($location) {
                let vm = this;

                vm.$onInit = onInit;
                function onInit() {
                    getIndexTab()
                }

                function getIndexTab() {
                    vm.tabs = ['teams', 'rounds'];

                    vm.activeTab = Object.keys($location.search()).find(k => /teams|rounds/.test(k));
                    if (vm.activeTab === undefined)
                        vm.activeTab = 'teams';
                }

                vm.onBack = function () {
                    $location.path("/games")
                };

                vm.updateUrlPath = function (key) {
                    $location.search(key);
                };
            }]
    });


