(function () {
    angular.module('teamRegisterForm')
        .component('teamRegisterForm', {
            templateUrl: 'player/team-register-form/team-register-form.html',
            css: 'player/team-register-form/team-register-form.css',
            controller: TeamRegister
        });

    TeamRegister.$inject = ['teamRequestService', 'TeamServiceFactory', 'GameServiceFactory', '$routeParams', '$window', '$location', 'gameRequestServiceFactory', 'OpenGameServiceFactory', '$scope'];

    function TeamRegister(teamRequestService, TeamService, GameService, $routeParams, $window, $location, gameRequestServiceFactory, OpenGameService, $scope) {
        let vm = this;
        vm.$onInit = onInit;
        let gameId = $routeParams.gameId;

        function initRegisterForm() {
            vm.teamName = '';
            vm.fullName = '';
            vm.phone = '';
            vm.teamSize = 4;
            vm.submitted = false;
            vm.isAutocomplete = false;
            vm.selectedTeam = {};
        }


        function onInit() {
            initRegisterForm();

            getGameDate();

            setupTeams();

            watchSelectedTeam();
        }

        function watchSelectedTeam() {
            $scope.$watch(() => {
                return vm.selectedTeam;
            }, (team) => {
                if (vm.selectedTeam === undefined) {
                    cancelAutocomplete();
                    return;
                }
                if (Object.keys(vm.selectedTeam).length !== 0) {
                    vm.isAutocomplete = true;
                    setupVerifyByPhoneNumber(team.originalObject);
                }
            });
        }

        function cancelAutocomplete() {
            vm.isAutocomplete = false;
            vm.fullName = '';
            vm.phone = '';
        }

        function saveRequestFromAutocompleteData(last3digits, team) {
            if (last3digits.length === 3) {
                teamRequestService
                    .getTeamRequests(team.$id)
                    .then((res) => {
                        res.forEach((teamRequest) => {
                            if (phoneMatchCheck(teamRequest.phone, last3digits)) {
                                vm.isAutocomplete = false;
                                vm.fullName = teamRequest.fullName;
                                vm.phone = teamRequest.phone;

                                vm.saveRequest = function () {
                                    saveTeam({
                                        teamId: team.$id,
                                        fullName: teamRequest.fullName,
                                        teamName: teamRequest.teamName,
                                        phone: teamRequest.phone,
                                        teamSize: teamRequest.teamSize,
                                        status: "unconfirmed",
                                        date: new Date().toDateString(),
                                    });
                                }

                            }
                        })
                    })
            }
        }

        function setupVerifyByPhoneNumber(team) {
            vm.last3digits = '';
            $scope.$watch(() => {
                return vm.last3digits;
            }, (last3digits) => {
                saveRequestFromAutocompleteData(last3digits, team);
            });
        }

        function phoneMatchCheck(originalPhoneNumber, last3digits, lastDigitsCount = 3) {
            let origLast3digits = originalPhoneNumber.substring(originalPhoneNumber.length - lastDigitsCount, originalPhoneNumber.length);
            return parseInt(last3digits) === parseInt(origLast3digits);
        }

        vm.cancelVerifyByNumber = function () {
            cancelAutocomplete();
        };

        function checkExistenceInputtedTeam(teamName) {
            for (let team of vm.teams) {
                if (team.name === teamName) {
                    vm.isAutocomplete = true;
                    setupVerifyByPhoneNumber(team);
                    break;
                } else {
                    cancelAutocomplete();
                }
            }
        }

        vm.getTeamName = function (teamName) {
            vm.teamName = teamName;
            checkExistenceInputtedTeam(teamName);
        };

        function saveRequestFromInputtedData() {
            let team = {
                fullName: vm.fullName,
                phone: vm.phone,
                teamSize: vm.teamSize,
                status: "unconfirmed",
                date: new Date().toDateString()
            };

            if (vm.selectedTeam === undefined || Object.keys(vm.selectedTeam).length === 0) {
                TeamService
                    .checkTeamNameCoincidence(vm.teamName)
                    .then((res) => {
                        if (!res) {
                            team.teamName = vm.teamName;
                            saveTeam(team);
                        }
                    });
            }
        }

        vm.saveRequest = function () {
            saveRequestFromInputtedData();
        };

        function saveTeam(team) {
            gameRequestServiceFactory.save(gameId, team)
                .then(() => {
                    vm.submitted = true;
                    setTimeout(() => {
                        $window.history.back();
                    }, 2000);
                });
        }

        vm.onBack = function () {
            $window.history.back();
        };

        function getGameDate() {
            OpenGameService
                .getOpenGameById(gameId)
                .then((res) => {
                        vm.gameDate = new Date(res.date).toLocaleDateString()
                    }
                );
        }

        function setupTeams() {
            TeamService
                .getAllTeams()
                .then((res) => {
                    vm.teams = res;
                });
        }
    }
})();