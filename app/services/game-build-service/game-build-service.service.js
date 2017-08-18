angular.module('gameBuildService')
    .factory('gameBuildServiceFactory', [
        function () {

            return {
                game: {curentRound: 1, currentQuiz: 1},
                addId: addId,
                addRound: addRound,
                addRoundsArray: addRoundsArray,
                addTeam: addTeam,
                addTeams: addTeams,
                addDate: addDate,
                addTime: addTime,
                addLocation: addLocation,
                addResult: addResult,
                addResults: addResults,
                buildGame: buildGame
            };

            function addId(id) {
                this.game.id = id;
            }

            function addRound(id, numberOfQuestion, name) {
                this.game.rounds.push(new GameRound(id, numberOfQuestion, name));
                return this;
            }

            function addRoundsArray(rounds) {
                for (let i = 0; i < rounds.length; i++) {
                    let newRound = new GameRound(rounds[i].sequenceNumber, rounds[i].quizzess, rounds[i].roundName);
                    this.game.rounds.push(newRound);
                }
                return this;
            }

            function addTeam(team) {
                this.game.teams.push(new GameTeam(team.id, team.name));
                return this;
            }

            function addTeams(teams) {
                for (let i = 0; i < teams.length; i++) {
                    let gameTeam = new GameTeam(teams[i].id, teams[i].name);
                    this.game.teams.push(gameTeam);
                }
                return this;
            }

            function addDate(date) {
                console.log(this);
                this.game.date = convertDate(date);
                return this;
            }

            function addTime(time) {
                this.game.time = convertTime(time);
                return this;
            }

            function addLocation(location) {
                this.game.location = location;
                return this;
            }

            function addResult(result) {
                this.game.results.push(result);
                return this;
            }

            function addResults(results) {
                for (let i = 0; i < teams.length; i++) {
                    this.game.teams.push(results[i]);
                }
                return this;
            }

            function buildGame() {
                return this.game;
            }


        }]
    );

function convertDate(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!

    let yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return mm + '/' + dd + '/' + yyyy;
}

function convertTime(time) {
    let hh = time.getHours();
    let mm = time.getMinutes();

    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return hh + ':' + mm;
}
