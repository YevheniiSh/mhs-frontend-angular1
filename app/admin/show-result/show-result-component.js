angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['TeamServiceFactory', 'GameServiceFactory', '$rootScope', '$location', function (TeamService, GameService, $rootScope, $location) {

            console.log(TeamService);


        }]

    });