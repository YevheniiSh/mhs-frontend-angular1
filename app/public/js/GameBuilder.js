class GameBuilder {
    constructor(game) {
        if(game === undefined){
            this.game = new Game();
        }
        else{
            this.game = new Game(game);
        }

    }


    addId(id) {
        this.game.id = id;
    }

    addRound(id, numberOfQuestion) {
        this.game.rounds.push(new GameRound(id, numberOfQuestion));
        return this;
    }

    addRoundsArray(rounds) {
        for (let i = 0; i < rounds.length; i++) {
            let newRound = new GameRound(i, rounds[i]);
            this.game.rounds.push(newRound);
        }
        return this;
    }

    addTeam(team) {
        this.game.teams.push(new GameTeam(team.id, team.name));
        return this;
    }

    addTeams(teams) {
        for (let i = 0; i < teams.length; i++) {
            let gameTeam = new GameTeam(teams[i].id, teams[i].name);
            this.game.teams.push(gameTeam);
        }
        return this;
    }

    addResult(result) {
        this.game.results.push(result);
        return this;
    }

    addResults(results) {
        for (let i = 0; i < teams.length; i++) {
            this.game.teams.push(results[i]);
        }
        return this;
    }

    buildGame() {
        return this.game;
    }
}
