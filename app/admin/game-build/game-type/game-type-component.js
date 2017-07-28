angular
    .module('mhs.admin')
    .component('gameType', {
        controller() {
            let vm = this;
            createGameType(vm);
        },
        templateUrl: 'admin/game-build/game-type/game-type.html',
        css: 'admin/game-build/game-type/game-type.css'
    });

function createGameType(vm) {

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
}