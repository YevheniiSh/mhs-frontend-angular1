angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$routeParams', '$rootScope', '$location', '$window','userAuthService', function (ResultService, GameService, $routeParams, $rootScope, $location, $window,auth) {


            this.showTeamResult = function () {
                $window.open($window.location.origin + `/#!/game-result/${$routeParams.gameId}`, ``, `width=auto,height=auto`);
            };


            this.onBack = function () {
                auth.currentUser()
                    .then(()=>{
                    $location.path(`/round-status/${$routeParams.gameId}`);
                })
                .catch (()=>{
                    $location.path(`/game-list`);
                })
                ;
            }
        }]

    });