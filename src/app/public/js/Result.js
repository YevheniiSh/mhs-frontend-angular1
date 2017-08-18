class Result {
    constructor(round, quiz,teamId) {
        this.quiz = quiz;
        this.round = round;
        this.teamId = teamId;
    }

    setScore(score){
        this.score = score;
    }
}