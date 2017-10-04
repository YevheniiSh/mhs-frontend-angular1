angular.module('createGame')
    .component('createGame', {
      templateUrl: 'app/admin/create-game/create-game.html',
      css: 'app/admin/create-game/create-game.css',
        controller: ['TeamServiceFactory',
            'OpenGameServiceFactory',
            '$scope',
            '$location',
            'gameBuildServiceFactory',
            '$locale',
            'convertServiceFactory',
            'seasonService',

            function (TeamService, OpenGameServiceFactory, $scope, $location, gameBuild, $locale, convertService, seasonService) {

                let vm = this;

                vm.createNewGame = function () {
                    let gameBuider = gameBuild.addDate(vm.gameDate)
                        .addTime(vm.gameTime)
                        .addLocation(vm.location);
                    if (vm.isSeasonGame) {
                        gameBuider.addSeason({id: vm.season.$id, name: vm.season.name});
                    } else {
                        delete gameBuider.game.season;
                    }
                    let game = gameBuider.buildGame();
                    OpenGameServiceFactory.createNewGame(game)
                        .then((gameId) => {
                          if (vm.isSeasonGame) {
                                seasonService.addGameToSeason(vm.season.$id, gameId)
                            }
                            vm.location = null;
                        })

                };

              vm.setGameDate = function (date) {
                vm.gameDate = date;
              };

              vm.setGameTime = function (time) {
                vm.gameTime = time;
              };

              vm.setSeason = function (season) {
                vm.season = season;
              };

              vm.setIsSeasonGame = function (isSeasonGame) {
                vm.isSeasonGame = isSeasonGame;
              }

            }]
    })
;
