angular
    .module('gameFactory')
    .factory('GameServiceFactory', ['$firebaseArray', 'firebaseDataService', '$firebaseObject',
        function ($firebaseArray, firebaseDataService, $firebaseObject) {

            let gameRef = firebaseDataService.games;

            return {
                getGameById: getGameById,
                save: save,
                getCurrentRound: getCurrentRound,
                getCurrentQuiz: getCurrentQuiz,
                getGameTeams: getGameTeams,
                setCurrentRound: setCurrentRound,
                setCurrentQuiz: setCurrentQuiz
            };

            function getGameById(gameId) {
                return $firebaseObject(gameRef.child(gameId)).$loaded();
            }

            function saveGame(obj, game) {
                obj.$value = game;
                obj.$save();
                return obj
                    .$loaded()
                    .then((res) => {
                        return res.$id;
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function save(game, gameId) {
                if (gameId === undefined) {
                    let obj = new $firebaseObject(gameRef.push());
                    return saveGame(obj, game);
                }
                else {
                    let obj = new $firebaseObject(gameRef.child(gameId));
                    //todo - we must rework this!
                    let rounds = {};
                    for (let i = 0; i < game.rounds.length; i++) {
                        rounds[game.rounds[i].id] = game.rounds[i].quantityOfQuestions;
                    }
                    game.rounds = rounds;
                    return saveGame(obj, game);
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
        }]);
