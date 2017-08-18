angular.module('gameBuildService')
    .factory('gameBuildServiceFactory', ['convertServiceFactory',
        function (convertService) {

            return {
                game: {curentRound: 1, currentQuiz: 1},
                addDate: addDate,
                addTime: addTime,
                addLocation: addLocation,
                buildGame: buildGame
            };

            function addDate(date) {
                console.log(this);
                this.game.date = convertService.convertDate(date);
                return this;
            }

            function addTime(time) {
                this.game.time = convertService.convertTime(time);
                return this;
            }

            function addLocation(location) {
                this.game.location = location;
                return this;
            }

            function buildGame() {
                return this.game;
            }


        }]
    );

