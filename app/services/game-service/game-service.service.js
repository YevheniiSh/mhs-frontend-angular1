angular
    .module('gameFactory')
    .factory('GameServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let currentGameRef = firebaseDataService.currentGames;
            let finishedGameRef = firebaseDataService.finishedGames;

            let ref;

            return {
                getGameById: getCurrentGameById,
                // save: save,
                getCurrentRound: getCurrentRound,
                getCurrentQuiz: getCurrentQuiz,
                getGameTeams: getGameTeams,
                setCurrentRound: setCurrentRound,
                setCurrentQuiz: setCurrentQuiz,
                finishGame: finishGame,
                publishGame: publishGame,
                getGameRef: getGameRef,
                getAllFinishedGames: getAllFinishedGames,
                getGameStatus: getGameStatus,
                getDate:getDate,
            };

            function getGameRef(gameId) {
                return getCurrentGameById(gameId)
                    .then((res) => {
                        console.log(res.$value);
                        if (res.$value !== null) {
                            return ref = currentGameRef;

                        }
                        else {
                            return ref = finishedGameRef;
                        }
                    })
                    .catch(() => {
                        console.log('error');
                        return ref = finishedGameRef
                    });
            }


            function getGameStatus(gameId) {
                return getCurrentGameById(gameId)
                    .then((res) => {
                        console.log(res.$value);
                        if (res.$value !== null) {
                            return 'current';

                        }
                        else {
                            return 'finished';
                        }
                    })
                    .catch(() => {
                        console.log('error');
                        return 'finished';
                    });
            }


            function getDate(gameStatus, gameId) {
              return new $firebaseObject(firebaseDataService.games.child(gameStatus).child(gameId).child('date')).$loaded();
            }

            function getCurrentGameById(gameId) {
                return new $firebaseObject(currentGameRef.child(gameId))
                    .$loaded();
            }

            function getFinishedGameById(gameId) {
                return new $firebaseObject(finishedGameRef.child(gameId))
                    .$loaded();
            }

            function getAllFinishedGames() {
                return new $firebaseArray(finishedGameRef)
                    .$loaded();
            }

            function finishGame(gameId) {
                getCurrentGameById(gameId).then((res) => {
                    console.log(res);
                    let obj = new $firebaseObject(finishedGameRef.child(gameId));
                    obj.$value = getObject(res);
                    obj.$save();
                    res.$remove();
                });


            }

            function getObject(obj) {
                let newObj = {};
                for (let key in obj) {
                    if (key.indexOf('$') < 0 && obj.hasOwnProperty(key)) {
                        newObj[key] = obj[key];
                    }
                    ;
                }
                return newObj;
            }

            // function saveGame(obj, game) {
            //     obj.$value = game;
            //     obj.$save();
            //     return obj
            //         .$loaded()
            //         .then((res) => {
            //             return res.$id;
            //         }, (err) => {
            //             console.error(err);
            //             return err;
            //         });
            // }
            //
            // function save(game, gameId) {
            //     if (gameId === undefined) {
            //         let obj = new $firebaseObject(currentGameRef.push());
            //         return saveGame(obj, game);
            //     }
            //     else {
            //         let obj = new $firebaseObject(currentGameRef.child(gameId));
            //         //todo - we must rework this!
            //         let rounds = {};
            //         for (let i = 0; i < game.rounds.length; i++) {
            //             rounds[game.rounds[i].id] = {
            //                 numberOfQuestions: game.rounds[i].numberOfQuestions,
            //                 name: game.rounds[i].name
            //             };
            //         }
            //         let teams = {};
            //         for (let i = 0; i < game.teams.length; i++) {
            //             teams[game.teams[i].id] = game.teams[i].name;
            //         }
            //         game.teams = teams;
            //         game.rounds = rounds;
            //         return saveGame(obj, game);
            //     }
            //
            // }

            function getCurrentRound(gameId) {
                return getStatus(gameId, 'currentRound');
            }

            function getCurrentQuiz(gameId) {
                return getStatus(gameId, 'currentQuiz');
            }

            function getStatus(gameId, status) {
                let currentRoundRef = currentGameRef
                    .child(`${gameId}/${status}`);

                return new $firebaseObject(currentRoundRef)
                    .$loaded()
                    .then((res) => {
                        return res.$value;
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function getGameTeams(gameId) {
                getGameRef(gameId)
                return $firebaseArray(ref.child(`/${gameId}/teams`))
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
                let obj = new $firebaseObject(currentGameRef.child(`${gameId}/currentRound`));
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
                let obj = new $firebaseObject(currentGameRef.child(`${gameId}/currentQuiz`));
                obj.$value = currentQuiz;
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

            function publishGame(gameId) {
                getCurrentGameById(gameId).then((res) => {
                    console.log(res);
                    let obj = new $firebaseObject(finishedGameRef.child(gameId));
                    obj.$value = getObject(res);
                    obj.$save();
                });
            }

        }]);
