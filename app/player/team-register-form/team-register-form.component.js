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
            vm.formStatus = 'full';
            vm.isChangesForbidden = false;
            vm.isCorrectLast3digits = true;
            vm.showPhoneVerifyRequest = false;
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
                    setupPhoneVerifyRequest(team.originalObject);
                }
            });
        }

        function cancelAutocomplete() {
            vm.formStatus = 'full';
            vm.fullName = '';
            vm.phone = '';
            vm.isChangesForbidden = false;
            vm.cancelAutocompleted = false;

            if (vm.selectedTeam === undefined) {
                return;
            }
            if (Object.keys(vm.selectedTeam).length !== 0) {
                vm.teamName = vm.selectedTeam.originalObject.name;
                vm.selectedTeam = {};
            }
        }

        vm.cancelVerifyByNumberWithReturnAutocompleteFeature = function () {
            cancelAutocomplete();
            vm.showPhoneVerifyRequest = true;
        };

        function setupVerifyByPhone(teamRequest) {
            vm.formStatus = 'full';
            vm.isChangesForbidden = true;
            vm.fullName = teamRequest.fullName;
            vm.phone = teamRequest.phone;
            vm.isCorrectLast3digits = true;
            vm.showPhoneVerifyRequest = false;
            vm.cancelAutocompleted = true;
        }

        function saveVerifiedRequest(team, teamRequest) {
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
            };
        }

        function saveRequestFromAutocompleteData(last3digits, team) {
            vm.isCorrectLast3digits = true;
            if (last3digits.length === 3) {
                teamRequestService
                    .getTeamRequests(team.$id)
                    .then((teamRequests) => {
                        for (let teamRequest of teamRequests) {
                            if (phoneMatchCheck(teamRequest.phone, last3digits)) {
                                setupVerifyByPhone(teamRequest);
                                saveVerifiedRequest(team, teamRequest);
                                break;
                            } else {
                                vm.isCorrectLast3digits = false;
                            }
                        }
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

        function setupPhoneVerifyRequest(team) {
            vm.showPhoneVerifyRequest = true;
            vm.formStatus = 'pending';
            vm.acceptPhoneVerifyRequest = function () {
                vm.formStatus = 'phoneVerify';
                setupVerifyByPhoneNumber(team);
            };
            vm.cancelPhoneVerifyRequest = function () {
                vm.showPhoneVerifyRequest = false;
                cancelAutocomplete();
            }
        }

        function checkExistenceInputtedTeam(teamName) {
            for (let team of vm.teams) {
                if (team.name.toLowerCase() === teamName.toLowerCase()) {
                    setupPhoneVerifyRequest(team);
                    break;
                } else {
                    cancelAutocomplete();
                    vm.showPhoneVerifyRequest = false;
                    vm.isChangesForbidden = false;
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
                        if (res) {
                            for (let teamFromAllTeams of vm.teams) {
                                if (teamFromAllTeams.name === vm.teamName) {
                                    team.teamName = teamFromAllTeams.name;
                                    team.teamId = teamFromAllTeams.$id;
                                    saveTeam(team);
                                    break;
                                }
                            }
                        } else {
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

        vm.hideAlert = function () {
            vm.isCorrectLast3digits = true;
        };
    }
})();