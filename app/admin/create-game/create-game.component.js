angular.module('createGame')
    .component('createGame', {
        templateUrl: 'admin/create-game/create-game.html',
        css: 'admin/create-game/create-game.css',
        controller: ['TeamServiceFactory',
            'OpenGameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, OpenGameServiceFactory, $rootScope, $location) {

                this.isCalendarVisible = false;
                this.isTimeVisible = false;
                this.gameDate = new Date();
                this.gameTime = new Date();
                this.gameTime.setSeconds(0);
                this.gameBuilder = new GameBuilder();
                this.location = null;

                this.createNewGame = function () {
                    let game = this.gameBuilder.addDate(this.gameDate).addTime(this.gameTime).addLocation(this.location).buildGame();

                    OpenGameServiceFactory.createNewGame(game);

                };

                this.ChangeCalendarStatus = function () {
                    this.isCalendarVisible ? this.isCalendarVisible = false : this.isCalendarVisible = true;
                };

                this.ChangeTimeStatus = function () {
                    this.isTimeVisible ? this.isTimeVisible = false : this.isTimeVisible = true;
                };

            }]

    })
;