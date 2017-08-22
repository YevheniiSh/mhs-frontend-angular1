angular.module('roundBuilder')
    .component('roundBuilder', {
        templateUrl: 'admin/round-builder/round-builder.html',
        css: 'admin/round-builder/round-builder.css',
        controller: roundBuilder,
        bindings: {
            rounds: '='
        },
    });

roundBuilder.$inject = [];

function roundBuilder(){
    let vm = this;
    let quizSequenceNumber = 1;

    vm.deleteRound = function ($index) {
        vm.rounds.splice($index, 1);
    };

    vm.addRound = function ($index) {
        console.log($index);
        let quiz = createRound(quizSequenceNumber++);
        vm.rounds.push(quiz);
    };

    function createRound(quizSequenceNumber) {
        return {$id: quizSequenceNumber, numberOfQuestions: 10, name: ""}
    }
}