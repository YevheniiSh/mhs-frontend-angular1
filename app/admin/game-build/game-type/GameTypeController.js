angular
    .module('mhs.admin')
    .controller('GameTypeController', GameTypeController);

function GameTypeController() {
    let vm = this;

    let rounds = [];
    let quizSequenceNumber = 1;

    vm.changeRoundCount = function (count) {
        for (let i = 0; i < count; i++) {
            let quiz = {sequenceNumber: quizSequenceNumber++, quizzess: 10};
            rounds.push(quiz);
        }
    };

    vm.rounds = rounds;
}