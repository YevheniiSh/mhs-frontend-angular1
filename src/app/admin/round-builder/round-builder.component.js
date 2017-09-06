angular.module('roundBuilder')
    .component('roundBuilder', {
      templateUrl: 'app/admin/round-builder/round-builder.html',
      css: 'app/admin/round-builder/round-builder.css',
        controller: roundBuilder,
        bindings: {
            rounds: '='
        },
    });

roundBuilder.$inject = [];

function roundBuilder(){
    let vm = this;

    vm.dragAndDropRound = function($index){
        vm.rounds.splice($index, 1);
    };

    vm.deleteRound = function ($index) {
        vm.rounds.splice($index, 1);
    };

    vm.addRound = function ($event) {
        vm.rounds.push(createRound());
        $event.preventDefault();
    };

    function createRound() {
        return {numberOfQuestions: 10, name: ""}
    }
}
