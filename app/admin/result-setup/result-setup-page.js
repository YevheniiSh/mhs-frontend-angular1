'use strict';
(function () {
    angular.module('resultSetup')
        .component('resultSetup', {
            templateUrl: 'admin/result-setup/result-setup-page.html',
            controller: ResultSetupController
        });

    ResultSetupController.$inject = [
        'GameServiceFactory',
        'resultSetupService',
        '$routeParams',
        '$location'
    ];

    function ResultSetupController(GameServiceFactory, resultSetupService, $routeParams, $location) {
        let vm = this;

        vm.isManualInput = false;
        vm.results = [];
        vm.$onInit = onInit;

        function onInit() {
            getRound();
            getTeams();
        }

        function getRound() {
            resultSetupService.getRound($routeParams.gameId, $routeParams.roundNumber)
                .then((round) => {
                    vm.round = round;
                    console.log(round);
                });
        }

        function getTeams() {
            resultSetupService.getGameTeams('-KrUOSGCVrIPwT4QsaYS')
                .then((teams) => {
                    vm.teams = teams;
                });
        }

        vm.range = function (n) {
            return new Array(n);
        };
    }
})();