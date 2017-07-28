angular
    .module('mhs.admin')
    .controller('GameTypeController', GameTypeController);

function GameTypeController($rootScope) {
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
        gameBuilder.addTeams($rootScope.teams);
        gameBuilder.addRoundsArray(rounds);
        let game = gameBuilder.buildGame();
        console.log(game);
        new GameService(DbConnection.getConnection()).save(game);
    }
}