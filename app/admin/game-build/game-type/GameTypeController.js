angular
    .module('mhs.admin')
    .controller('GameTypeController', GameTypeController);

function GameTypeController($routeParams) {
    let vm = this;
    let rounds = [];
    let quizSequenceNumber = 1;

    vm.changeRoundCount = function (count) {
        quizSequenceNumber = 1;
        rounds.splice(0, rounds.length);
        for (let i = 0; i < count; i++) {
            let quiz = {sequenceNumber: quizSequenceNumber++, quizzess: 10};
            rounds.push(quiz);
        }
    };

    vm.rounds = rounds;

    vm.buildGame = function () {
        let gameBuilder = new GameBuilder();
        gameBuilder.addRoundsArray(rounds);
        let game = gameBuilder.buildGame();

        console.log($routeParams.gameId);
        new GameService(DbConnection.getConnection()).save((game));
    }
}