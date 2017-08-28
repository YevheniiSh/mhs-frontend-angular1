(function () {
    angular.module('teamRegisterForm')
        .component('teamRegisterForm', {
            templateUrl: 'player/team-register-form/team-register-form.html',
            css: 'player/team-register-form/team-register-form.css',
            controller: TeamRegister
        });

    TeamRegister.$inject = ['teamRequestService', 'TeamServiceFactory', '$routeParams', '$window', 'gameRequestServiceFactory', 'OpenGameServiceFactory', '$scope'];

    function TeamRegister(teamRequestService, TeamService, $routeParams, $window, gameRequestServiceFactory, OpenGameService, $scope) {
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
            vm.isCorrectLastDigits = true;
            vm.showPhoneVerifyRequest = false;
            vm.selectedTeam = {};
        }

        function onInit() {
            initRegisterForm();

            getGameDate();

            setupTeams();

            watchSelectedTeam();

            saveRequest();
        }

        function watchSelectedTeam() {
            $scope.$watch(() => {
                return vm.selectedTeam;
            }, (team) => {
                if (vm.selectedTeam === undefined) {
                    cancelAutocomplete();
                    return;
                }

                if (isSelectedTeamNotEmpty()) {
                    cleanAutoselectedTeam();
                    setupPhoneVerifyRequest(team.originalObject);
                }
            });
        }

        function cancelAutocomplete() {
            vm.formStatus = 'full';
            vm.fullName = '';
            vm.phone = '';
            vm.lastDigits = '';
            vm.cancelAutocompleted = false;

            if (vm.selectedTeam === undefined) {
                return;
            }

            if (isSelectedTeamNotEmpty()) {
                cleanAutoselectedTeam();
            }
        }


        function isSelectedTeamNotEmpty() {
            return Object.keys(vm.selectedTeam).length !== 0;
        }

        function cleanAutoselectedTeam() {
            vm.teamName = vm.selectedTeam.originalObject.name;
            vm.selectedTeam = {};
        }

        function saveRequest() {
            vm.saveRequest = function () {
                saveRequestFromInputtedData();
            };
        }

        vm.cancelVerifyByNumberWithReturnAutocompleteFeature = function () {
            cancelAutocomplete();
            vm.showPhoneVerifyRequest = true;
            saveRequest();
        };

        function setupVerifyByPhone(teamRequest) {
            vm.formStatus = 'full';
            vm.fullName = teamRequest.fullName;
            vm.phone = teamRequest.phone;
            vm.isCorrectLastDigits = true;
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

        function saveRequestFromAutocompleteData(lastDigits, team) {
            vm.isCorrectLastDigits = true;
            if (lastDigits.length === 3) {
                teamRequestService
                    .getTeamRequests(team.$id)
                    .then((teamRequests) => {
                        for (let teamRequest of teamRequests) {
                            if (phoneMatchCheck(teamRequest.phone, lastDigits)) {
                                setupVerifyByPhone(teamRequest);
                                saveVerifiedRequest(team, teamRequest);
                                break;
                            } else {
                                vm.isCorrectLastDigits = false;
                            }
                        }
                    })
            }
        }

        function setupVerifyByPhoneNumber(team) {
            vm.lastDigits = '';
            $scope.$watch(() => {
                return vm.lastDigits;
            }, (lastDigits) => {
                saveRequestFromAutocompleteData(lastDigits, team);
            });
        }

        function phoneMatchCheck(originalPhoneNumber, lastDigits, lastDigitsCount = 3) {
            let origLastDigits = originalPhoneNumber.substring(originalPhoneNumber.length - lastDigitsCount, originalPhoneNumber.length);
            return parseInt(lastDigits) === parseInt(origLastDigits);
        }

        vm.cancelVerifyByNumber = function () {
            cancelAutocomplete();
        };

        function setupPhoneVerifyRequest(team) {
            vm.showPhoneVerifyRequest = true;

            vm.formStatus = 'phoneVerify';

            setupVerifyByPhoneNumber(team);
        }

        function checkExistenceInputtedTeam(teamName) {
            for (let team of vm.teams) {
                if (team.name.toLowerCase() === teamName.toLowerCase()) {
                    setupPhoneVerifyRequest(team);
                    break;
                } else {
                    cancelAutocomplete();
                    vm.showPhoneVerifyRequest = false;
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
            vm.isCorrectLastDigits = true;
        };
    }
})();