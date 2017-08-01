angular
    .module('gameFactory')
    .factory('GameServiceFactory', ['dbConnection', function (dbConnection) {

        let gameRef = dbConnection.ref().child('games');

        let gameFactory = {};

        gameFactory.getGameById = function (gameId) {
            return gameRef
                .child(gameId)
                .once('value')
                .then(
                    (res) => {
                        return gameFactory.convertFromFirebase(res);
                    },
                    (err) => {
                        console.log(err);
                        return err;
                    })
        };

        gameFactory.save = function (game, gameId) {
            if (gameId === undefined) {
                game = gameFactory.convertForFirebase(game);
                return gameRef.push(game);
            }
            else {
                game = gameFactory.convertForFirebase(game);
                gameRef.child(gameId).set(game);
                return gameId;
            }

        };

        gameFactory.getCurrentRound = function (gameId) {
            return gameRef
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
        };

        gameFactory.getCurrentQuiz = function (gameId) {
            return gameRef
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
        };

        gameFactory.getGameTeams = function (gameId) {
            return gameRef
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
        };

        gameFactory.setCurrentRound = function (currentRound, gameId) {
            return gameRef.child(`${gameId}/currentRound`)
                .set(currentRound)
                .then(() => {
                    return currentRound;
                }, (err) => {
                    console.log(err);
                    return err;
                });
        };

        gameFactory.setCurrentQuiz = function (currentQuiz, gameId) {
            return gameRef.child(`${gameId}/currentQuiz`)
                .set(currentQuiz)
                .then(() => {
                    return currentQuiz;
                }, (err) => {
                    console.log(err);
                    return err;
                });
        };

        gameFactory.convertForFirebase = function (game) {
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
        };

        gameFactory.convertFromFirebase = function (game) {
            let roundTemp = [];
            for (let key in game.rounds) {
                roundTemp.push(new GameRound(key, game.rounds[key]));
            }
            game.rounds = roundTemp;

            let teamsTemp = [];
            for (let key in game.teams) {
                teamsTemp.push(new GameTeam(key, game.teams[key]));
            }
            game.teams = teamsTemp;

            //ToDo convert from results

            return game;
        };
        return gameFactory;
    }]);
