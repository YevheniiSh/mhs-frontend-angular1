angular
    .module('resultService')
    .factory('ResultServiceFactory', ['firebaseDataService', function (firebaseDataService) {

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

        resultFactory.filter = function (filter, gameId, gameStatus) {
            let ref;
            if (gameStatus === 'current') {
                ref = currentRef;
            }
            else if (gameStatus === 'finished') {
                ref = finishedRef;
            }
                return ref.child(`/${gameId}/results`)
                    .orderByChild(filter.by).equalTo(filter.val)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };

        resultFactory.getGameResults = function (gameId, gameStatus) {
            let ref;

            if (gameStatus === 'current') {
                console.log(gameStatus);

                ref = currentRef;
            }
            else if (gameStatus === 'finished') {
                ref = finishedRef;
            }

                return ref.child(`/${gameId}/results`)
                    .once('value')
                    .then((res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
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