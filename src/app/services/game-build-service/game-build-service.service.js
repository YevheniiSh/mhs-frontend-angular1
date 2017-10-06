angular.module('gameBuildService')
    .factory('gameBuildServiceFactory', ['convertServiceFactory',
        function (convertService) {

            return {
                game: {currentRound: 1, currentQuiz: 1},
                addDate: addDate,
                addTime: addTime,
                addLocation: addLocation,
                addSeason: addSeason,
              addPrivate: addPrivate,
                buildGame: buildGame
            };

            function addDate(date) {
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

            function addSeason(season) {
                this.game.season = season;
                return this
            }

          function addPrivate(isPrivate) {
            this.game.isPrivate = isPrivate;
            return this;
          }

            function buildGame() {
                return this.game;
            }


        }]
    );

