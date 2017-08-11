angular.module('teamList')
    .component('teamList', {
            templateUrl: 'admin/team-list/team-list.html',
            controller: ['TeamServiceFactory', '$routeParams', '$rootScope', '$location',
                function (TeamService, $routeParams, $rootScope, $location) {
                    let vm = this;
                    vm.selected = null;

                    TeamService.getAllTeams().then((arr) => {
                        vm.teams = arr;
                        console.log(vm.teams);
                    });

                    vm.onClick = function (team) {
                        vm.selected = team;
                        console.log(vm.selected);
                    }
                }
            ]
        }
    );