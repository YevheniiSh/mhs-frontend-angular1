angular.module('createGame')
    .component('createGame', {
        templateUrl: 'admin/create-game/create-game.html',
        css: 'create-game.css',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

                this.isCalendarVisible = false;
                this.gameDate = new Date();


                this.createGame = function () {
                    let game = new GameBuilder().addDate(this.gameDate).buildGame();
                    GameService.save(game)
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