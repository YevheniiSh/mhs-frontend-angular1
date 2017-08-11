class Game {
    constructor(game) {
        if (game === undefined) {
            this.currentRound = 1;
            this.currentQuiz = 1;
            this.teams = [];
            this.rounds = [];
            this.results = [];
            this.date = "";
            this.location = null;
            this.winner = null;
        }
        else {
            this.currentRound = game.currentRound;
            this.currentQuiz = game.currentQuiz;
            this.teams = game.teams;
            this.date = game.date;
            this.location = game.location;
            if (game.winner === undefined) {
                this.winner = null;
            }
            else {
                this.winner = game.winner;
            }


            if (game.rounds === undefined) {
                this.rounds = [];
            } else this.rounds = game.rounds;

            if (game.results === undefined) {
                this.results = [];
            } else this.results = game.results;

            // this.convertFromFirebase();
        }

    }


    getRoundsQuantity() {
        return rounds.length;
    }

    getGameResult() {
        let gameResults = this.resultService.getResultsById();

    }

    getRoundResult() {

    }

    getTeamResult(teamId) {
        let teamResult = this.resultService.getTeamResults(teamId, this.id);
    }
}
