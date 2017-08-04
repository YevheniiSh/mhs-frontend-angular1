angular
    .module('resultService')
    .factory('ResultServiceFactory', ['firebaseDataService', 'GameServiceFactory', function (firebaseDataService, gameService) {

        let currentRef = firebaseDataService.currentGames;
        let finishedRef = firebaseDataService.finishedGames;


            let resultFactory = {};

            resultFactory.saveResult = function (result, gameId) {
                let resultKey = result.round + "_" + result.quiz + "_" + result.teamId;
                return currentRef.child(`${gameId}/results/${resultKey}`)
                    .set(result)
                    .then(() => {
                        return resultKey;
                    }, (err) => {
                        console.log(err);
                        return err;
                    });
            };

        resultFactory.filter = function (filter, gameId) {
            let ref = gameService.getGameRef(gameId);
            console.log(ref);
            return ref.then((res) => {
                return res.child(`/${gameId}/results`)
                    .orderByChild(filter.by).equalTo(filter.val)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            });
            };

        resultFactory.getGameResults = function (gameId) {
            let ref = gameService.getGameRef(gameId);

            return ref.then((res) => {
                console.log(res);
                return res.child(`/${gameId}/results`)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            })

            };

            resultFactory.getByRoundAndQuiz = function (roundId, quizId, gameId) {
                return currentRef.child(`/${gameId}/results/`)
                    .orderByKey().startAt(`${roundId}_${quizId}_`).endAt(`${roundId}_${quizId}_~`)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };
            return resultFactory;
        }]
    );