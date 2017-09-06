(function () {
    angular.module('resultSetup')
        .component('defaultRound', {
            templateUrl: 'admin/round-type/default/default-round.html',
            css: 'admin/round-type/default/default-round.css',
            controller: DefaultRoundController,
            bindings: {
                results: '=',
                isManualInput: '=',
                onSave: '&'
            }
        });

    DefaultRoundController.$inject = [];

    function DefaultRoundController() {
        let vm = this;

        vm.$onInit = onInit;

        function onInit() {
            vm.weightOfResponse = 1;
        }

        function calculateScore(result) {
            return Math.floor(result.numberOfCorrectAnswers * vm.weightOfResponse * 100) / 100
        }

        vm.saveResult = function (result) {
            if (vm.isManualInput) {
                result.score = calculateScore(result);
                vm.onSave({result: result});
                return;
            }
            vm.onSave({result: result});
        };

        vm.recalculateScore = function () {
            vm.results.forEach((result) => {
                result.score = calculateScore(result);
                vm.onSave({result: result});
            })
        };
    }
})();