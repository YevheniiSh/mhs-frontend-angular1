angular.module('roundBuilder')
    .component('roundBuilder', {
        templateUrl: 'admin/round-builder/round-builder.html',
        css: 'admin/round-builder/round-builder.css',
        controller: roundBuilder,
        bindings: {
            rounds: '='
        },
    });

roundBuilder.$inject = ['roundTypeService'];

function roundBuilder(roundTypeService) {
    let vm = this;
    vm.$onInit = onInit;

    function onInit() {
        getRoundTypes()
            .then(setDefaultTypeSelected);
    }

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

    function getRoundTypes() {
        return roundTypeService.getRoundTypes()
            .then((types) => {
                console.log(types);
                vm.roundTypes = types;
                return types;
            });
    }

    function setDefaultTypeSelected(type) {
        type.forEach((item) => {
            console.log(item);
            if (item.$id === "DEFAULT_ROUND") {
                vm.selectedItem = item;
            }
        })
    }
}