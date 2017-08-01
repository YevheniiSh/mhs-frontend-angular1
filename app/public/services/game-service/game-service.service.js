angular
    .module('gameFactory')
    .factory('GameServiceFactory', ['$firebaseArray', 'firebaseDataService', '$firebaseObject',
        function ($firebaseArray, firebaseDataService, $firebaseObject) {

            let gameRef = firebaseDataService.games;

            let gameFactory = {
                getGameById: getGameById,
                save: save,
                getCurrentRound: getCurrentRound,
                getCurrentQuiz: getCurrentQuiz,
                getGameTeams: getGameTeams,
                setCurrentRound: setCurrentRound,
                setCurrentQuiz: setCurrentQuiz,
                convertForFirebase: convertForFirebase,
                convertFromFirebase: convertFromFirebase
            };
            return gameFactory;

            function getGameById(gameId) {
                return $firebaseObject(gameRef.child(gameId)).$loaded();

                // return gameRef
                //     .child(gameId)
                //     .once('value')
                //     .then(
                //         (res) => {
                //             return gameFactory.convertFromFirebase(res);
                //         },
                //         (err) => {
                //             console.log(err);
                //             return err;
                //         })
            }

            function save(game, gameId) {
                if (gameId === undefined) {
                    game = gameFactory.convertForFirebase(game);
                    return gameRef.push(game);
                }
                else {
                    game = gameFactory.convertForFirebase(game);
                    gameRef.child(gameId).set(game);
                    return gameId;
                }

            }

            function getCurrentRound(gameId) {
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
            }

            function getCurrentQuiz(gameId) {
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
            }

            function getGameTeams(gameId) {
                return $firebaseArray(gameRef.child(`/${gameId}/teams`))
                    .$loaded()
                    .then((res) => {
                        return res.map((team) => {
                            return {teamId: team.$id, name: team.$value}
                        });
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function setCurrentRound(currentRound, gameId) {
                let obj = new $firebaseObject(gameRef.child(`${gameId}/currentRound`));
                obj.$value = currentRound;
                obj.$save();
                return obj
                    .$loaded()
                    .then((res) => {
                        return res.$value;
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function setCurrentQuiz(currentQuiz, gameId) {
                return gameRef.child(`${gameId}/currentQuiz`)
                    .set(currentQuiz)
                    .then(() => {
                        return currentQuiz;
                    }, (err) => {
                        console.log(err);
                        return err;
                    });
            }

            function convertForFirebase(game) {
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

            function convertFromFirebase(game) {
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
            }
        }]);
