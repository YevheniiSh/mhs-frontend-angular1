angular.module('createGame')
    .component('createGame', {
        templateUrl: 'admin/create-game/create-game.html',
        css: 'admin/create-game/create-game.css',
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
                                vm.season.id = season.$id
                            }
                        })
                }

                vm.createNewGame = function () {
                    let gameBuider = gameBuild.addDate(vm.gameDate)
                        .addTime(vm.gameTime)
                        .addLocation(vm.location);
                    if (vm.isSeasonGame) {
                        gameBuider.addSeason({id: vm.season.id, name: vm.season.name});
                    }else{
                        delete gameBuider.game['season'];
                    }
                    let game = gameBuider.buildGame();
                    OpenGameServiceFactory.createNewGame(game)
                        .then((gameId) => {
                            if(vm.isSeasonGame){
                                seasonService.addGameToSeason(vm.season.id, gameId)
                            }
                            vm.isCalendarVisible = false;
                            vm.isTimeVisible = false;
                            vm.location = null;
                            setCurrentSeason();
                        });
                };

                vm.getTimeForView = function () {
                    return convertService.convertTimeForView(vm.gameTime)
                };

                vm.ChangeCalendarStatus = function () {
                    if (vm.isCalendarVisible) {
                        vm.isCalendarVisible = false;
                    } else if (vm.isTimeVisible) {
                        vm.isTimeVisible = false;
                        vm.isCalendarVisible = true;
                    }
                    else {
                        vm.isCalendarVisible = true;
                    }
                };

                vm.ChangeTimeStatus = function () {
                    if (vm.isTimeVisible) {
                        vm.isTimeVisible = false;
                    }
                    else if (vm.isCalendarVisible) {
                        vm.isTimeVisible = true;
                        vm.isCalendarVisible = false;
                    }
                    else {
                        vm.isTimeVisible = true;
                    }
                };

                vm.saveSeason = function () {
                    seasonService.save({name: vm.newSeasonName})
                        .then(seasonId => {
                            vm.season = {id: seasonId, name: vm.newSeasonName};
                            seasonService.openSeason(seasonId);
                            vm.seasonEditor = false;
                            vm.isSeasonGame = true;
                        })

                }
            }]

    })
;