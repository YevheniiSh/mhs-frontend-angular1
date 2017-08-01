angular
    .module('resultService')
    .factory('ResultServiceFactory', ['dbConnection', function (dbConnection) {

            let ref = dbConnection.ref().child("games");

            let resultFactory = {};

            resultFactory.saveResult = function (result, gameId) {
                let resultKey = result.round + "_" + result.quiz + "_" + result.teamId;
                return ref.child(`${gameId}/results/${resultKey}`)
                    .set(result)
                    .then(() => {
                        return resultKey;
                    }, (err) => {
                        console.log(err);
                        return err;
                    });
            };

            resultFactory.filter = function (filter, gameId) {
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

            resultFactory.getGameResults = function (gameId) {
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
                return ref.child(`/${gameId}/results/`)
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