class Game{
    constructor(game){
        if(game === undefined){
            this.currentRound = 1;
            this.currentQuiz = 1;
            this.teams = [];
            this.rounds = [];
            this.results = [];

        }
        else {
            this.currentRound = game.currentRound;
            this.currentQuiz = game.currentQuiz;
            this.teams = game.teams;
            this.rounds = game.rounds;
            this.results = game.results;


            this.convertFromFirebase();
        }

    }



    getRoundsQuantity(){
        return rounds.length;
    }

    getGameResult(){
       let gameResults = this.resultService.getResultsById();

    }

    getRoundResult(){

    }

    getTeamResult(teamId){
        let teamResult = this.resultService.getTeamResults(teamId, this.id);
    }
}
