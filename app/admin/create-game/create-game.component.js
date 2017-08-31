angular.module('createGame')
    .component('createGame', {
        templateUrl: 'admin/create-game/create-game.html',
        css: 'admin/create-game/create-game.css',
        controller: ['TeamServiceFactory',
            'OpenGameServiceFactory',
            '$rootScope',
            '$location',
            'gameBuildServiceFactory',
            '$locale',
            'convertServiceFactory',
            'seasonService',

            function (TeamService, OpenGameServiceFactory, $rootScope, $location, gameBuild, $locale, convertService,seasonService) {

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
                vm.location = null;
                vm.$onInit = onInit;

                function onInit() {
                    initSeasons();
                }

                function initSeasons() {
                    vm.seasons = seasonService.getSeasonsNames()
                        .then(res=>{
                            vm.seasons = res;
                        });
                }
                vm.createNewGame = function () {
                    if(vm.selectedSeason){
                        vm.season = vm.selectedSeason.originalObject;
                        saveGame();
                    }else{
                        seasonService.save({name:vm.seasonName})
                            .then(res=>{
                                vm.season = {id:res, name:vm.seasonName};
                                saveGame();
                            });
                    }
                };

                function saveGame(){
                    let game = gameBuild.addDate(vm.gameDate)
                        .addTime(vm.gameTime)
                        .addLocation(vm.location)
                        .addSeason(vm.season)
                        .buildGame();
                    OpenGameServiceFactory.createNewGame(game)
                        .then(() => {
                            vm.location = null;
                        });
                    vm.isCalendarVisible = false;
                    vm.isTimeVisible = false;
                    vm.season = null;
                    vm.selectedSeason = null;
                    initSeasons();
                }

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

                vm.setSeasonName = function (seasonName) {
                    vm.seasonName = seasonName;
                }


            }]

    })
;