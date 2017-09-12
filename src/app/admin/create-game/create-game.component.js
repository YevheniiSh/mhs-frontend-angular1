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
                vm.newSeasonName = '';
                vm.isCalendarVisible = false;
                vm.isTimeVisible = false;
                vm.options = {};
                vm.options.minDate = new Date();
                vm.options.startingDay = $locale.DATETIME_FORMATS.DAY.FIRSTDAYOFWEEK = 1;
                vm.isMeridian = false;
                vm.gameDate = new Date();
                vm.gameTime = new Date();
                vm.gameTime.setHours(19);
                vm.gameTime.setMinutes(0);
                vm.gameTime.setSeconds(0);
                vm.$onInit = onInit;

                function onInit() {
                    setCurrentSeason();
                    vm.isSeasonGame = false;

                }

                function setCurrentSeason() {
                    seasonService.getCurrentSeason()
                        .then(season => {
                            if (season) {
                                vm.season = season;
                            }
                        })
                }

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
                            vm.isCalendarVisible = false;
                            vm.isTimeVisible = false;
                            vm.location = null;
                        })

                };

                vm.getTimeForView = function () {
                    return convertService.convertTimeForView(vm.gameTime)
                };

                vm.saveSeason = function () {
                    if (vm.newSeasonName !== '') {
                        seasonService.save({name: vm.newSeasonName})
                            .then(seasonId => {
                                seasonService.openSeason(seasonId);
                                vm.seasonEditor = false;
                                vm.isSeasonGame = true;
                                setCurrentSeason();
                            })
                    } else {
                        vm.showSeasonNameValidation = true;
                    }
                };

                vm.closeSeasonEditor = function () {
                    vm.showSeasonNameValidation = false;
                    vm.seasonEditor = false;
                };

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
                  vm.isTimeVisible = false;
                  return true
                }
                return false
              }

              function isCalendarPikerOpen() {
                if (vm.isCalendarVisible) {
                  vm.isCalendarVisible = false;
                  return true
                }
                return false
              }
            }]
    })
;
