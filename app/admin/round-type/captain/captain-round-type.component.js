angular.module('resultSetup')
    .component('captainRound', {
        templateUrl: 'admin/round-type/captain/captain-round-type.html',
        css: 'admin/round-type/captain/captain-round-type.css',
        controller: CaptainRoundTypeController,
        bindings: {
            results: '=',
            saveResult: '&'
        },
    });

CaptainRoundTypeController.$inject = [
    '$routeParams',
    'GameServiceFactory'
];

function CaptainRoundTypeController($routeParams, GameServiceFactory) {
    let vm = this;

    vm.$onInit = onInit;

    function onInit(){
        GameServiceFactory.getRoundByGameAndId($routeParams.gameId,$routeParams.roundNumber)
            .then(round=>{
                vm.weigth = round.roundType.start+(round.roundType.step*($routeParams.quizNumber-1));
                console.log(vm.weigth)
        })
    }

}