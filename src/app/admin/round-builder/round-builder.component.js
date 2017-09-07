angular.module('roundBuilder')
    .component('roundBuilder', {
      templateUrl: 'app/admin/round-builder/round-builder.html',
      css: 'app/admin/round-builder/round-builder.css',
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
      .then(setDefaultType);
  }

    vm.dragAndDropRound = function($index){
      console.log(vm.rounds);
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
      return {numberOfQuestions: 10, name: "", roundType: vm.defaultType}
    }

  function getRoundTypes() {
    return roundTypeService.getRoundTypes()
      .then((types) => {
        vm.roundTypes = types;
        vm.roundTypes.forEach((item) => {
          item.type = item.$id;
        });
        return types;
      });
  }

  function setDefaultType(type) {
    type.forEach((item) => {
      if (item.$id === "DEFAULT_ROUND") {
        vm.defaultType = item;
      }
    });
    return type;
    }
}
