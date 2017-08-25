angular.module('createGame')
    .component('createGame', {
        templateUrl: 'admin/create-game/create-game.html',
        css: 'admin/create-game/create-game.css',
        controller: ['TeamServiceFactory',
            'OpenGameServiceFactory',
            '$rootScope',
            '$location',
            'gameBuildServiceFactory',

            function (TeamService, OpenGameServiceFactory, $rootScope, $location, gameBuild) {

                this.isCalendarVisible = false;
                this.isTimeVisible = false;
                this.options = {};
                this.options.minDate = new Date();
                this.gameDate = new Date();
                this.gameTime = new Date();
                this.gameTime.setHours(19);
                this.gameTime.setMinutes(0);
                this.gameTime.setSeconds(0);
                // this.gameBuilder = gameBuild.getGameBuilder();
                this.location = null;

                this.createNewGame = function () {
                    let game = gameBuild.addDate(this.gameDate).addTime(this.gameTime).addLocation(this.location).buildGame();

                    OpenGameServiceFactory.createNewGame(game)
                        .then(() => {
                            this.location = null;
                        });
                    this.isCalendarVisible = false;
                    this.isTimeVisible = false;

                };

                this.ChangeCalendarStatus = function () {
                    if (this.isCalendarVisible) {
                        this.isCalendarVisible = false;
                    } else if (this.isTimeVisible) {
                        this.isTimeVisible = false;
                        this.isCalendarVisible = true;
                    }
                    else {
                        this.isCalendarVisible = true;
                    }
                };

                this.ChangeTimeStatus = function () {
                    if (this.isTimeVisible) {
                        this.isTimeVisible = false;
                    }
                    else if (this.isCalendarVisible) {
                        this.isTimeVisible = true;
                        this.isCalendarVisible = false;
                    }
                    else {
                        this.isTimeVisible = true;
                    }
                };

            }]

    })
;