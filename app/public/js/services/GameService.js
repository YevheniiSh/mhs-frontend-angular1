class GameService {
    constructor(connection) {
        this.connection = connection;
        this.gameRef = this.connection.ref().child('games');
        this.ref = this.connection.ref();
    }

    getGameById(gameId) {
        return this.gameRef
            .child(gameId)
            .once('value')
            .then(
                (res) => {
                    return this.convertFromFirebase(res);
                },
                (err) => {
                    console.log(err);
                    return err;
                })
    }

    save(game) {
        game = this.convertForFirebase(game);
        return this.gameRef
            .push(game)
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    };

    getCurrentRound(gameId) {
        return this.gameRef
            .child(gameId)
            .child('currentRound')
            .once('value')
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                }
            )
    }

    getCurrentQuiz(gameId) {
        return this.gameRef
            .child(gameId)
            .child('currentQuiz')
            .once('value')
            .then(
                (res) => {
                    return res;
                },
                (err) => {
                    console.log(err);
                    return err;
                }
            )
    }

    getGameTeams(gameId) {
        return this.gameRef
            .child(`/${gameId}/teams`)
            .once('value')
            .then((res) => {
                    let teams = [];
                    for (let key in res.val()) {
                        teams.push({teamId: key, name: res.val()[key]})
                    }
                    return teams;
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    }

    setCurrentRound(currentRound,gameId){
        return this.gameRef.child(`${gameId}/currentRound`)
            .set(currentRound)
            .then(() => {
                return currentRound;
            }, (err) => {
                console.log(err);
                return err;
            });
    }

    setCurrentQuiz(currentQuiz,gameId){
        return this.gameRef.child(`${gameId}/currentQuiz`)
            .set(currentQuiz)
            .then(() => {
                return currentQuiz;
            }, (err) => {
                console.log(err);
                return err;
            });
    }

    convertForFirebase(game) {
        let temp = {};
        for (let i = 0; i < game.teams.length; i++) {
            temp[game.teams[i].id] = game.teams[i].name;
        }
        game.teams = temp;

        let roundsTemp = {};
        for (let i = 0; i < game.rounds.length; i++) {
            roundsTemp[game.rounds[i].id] = game.rounds[i].quantityOfQuestions;
        }
        game.rounds = roundsTemp;

        return game;
    }

    convertFromFirebase(game) {
        let roundTemp = []
        for (let key in game.rounds) {
            roundTemp.push(new GameRound(key, game.rounds[key]));
        }
        game.rounds = roundTemp;

        let teamsTemp = []
        for (let key in game.teams) {
            teamsTemp.push(new GameTeam(key, game.teams[key]));
        }
        game.teams = teamsTemp;

        //ToDo convert from results

        return game;
    }
}
