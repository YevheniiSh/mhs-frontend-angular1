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
                this.gameDate = new Date();
                this.gameBuilder = new GameBuilder();

                this.createNewGame = function () {
                    let game = this.gameBuilder.addDate(this.gameDate).buildGame();
                    OpenGameServiceFactory.createNewGame(game)
                        .then((res) => {
                            console.log(res);
                        });
                };

                this.ChangeCalendarStatus = function () {
                    this.isCalendarVisible ? this.isCalendarVisible = false : this.isCalendarVisible = true;
                }

            }]

    })
;