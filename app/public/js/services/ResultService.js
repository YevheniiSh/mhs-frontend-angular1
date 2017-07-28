    class ResultService {
    constructor(database) {
        this.database = database;
        this.ref = database.ref().child("games");
    }

    saveResult(result, gameId) {
        let resultKey = result.round + "_" + result.quiz + "_" + result.teamId;
        return this.ref.child(`${gameId}/results/${resultKey}`)
            .set(result)
            .then(() => {
                return resultKey;
            }, (err) => {
                console.log(err);
                return err;
            });
    }

    filter(filter, gameId) {
        return this.ref.child(`/${gameId}/results`)
            .orderByChild(filter.by).equalTo(filter.val)
            .once('value')
            .then((res) => {
                    return res.val();
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    }

    getGameResults(gameId) {
        return this.ref.child(`/${gameId}/results`)
            .once('value')
            .then((res) => {
                    return res.val();
                },
                (err) => {
                    console.log(err);
                    return err;
                });
    }

    getByRoundAndQuiz(roundId,quizId,gameId){
        return this.ref.child(`/${gameId}/results/`)
            .orderByKey().startAt(`${roundId}_${quizId}_`).endAt(`${roundId}_${quizId}_~`)
            .once('value')
            .then((res) => {
                    return res.val();
                },
                (err) => {
                    console.log(err);
                    return err;
                });

    }

}