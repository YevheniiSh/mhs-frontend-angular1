angular.module('teamResults')
    .component('captainResult', {
        templateUrl: 'admin/team-result-types/captain-result/captain-result.html',
        css: 'admin/team-result-types/captain-result/captain-result.css',
        controller: captainResultController,
        bindings: {
            round: '=',
            saveResult: '&'
        }
    });

captainResultController.$inject = ['ResultServiceFactory','$routeParams'];

function captainResultController(ResultServiceFactory,$routeParams){
    let vm = this;

    vm.$onInit = onInit;
    
    function onInit() {
        vm.lastResultIndex = getLastResult();
    }

    function getLastResult() {
        let lastResultIndex = 0;
        vm.round.quizzes.forEach((result,key)=>{
            if (result.score !== 0){
                lastResultIndex = key;
            }
        });
        return lastResultIndex;
    }

    function resultKey(result) {
        return [result.round, result.quiz, result.teamId].join('_');
    }

    vm.setLastResultIndex = function(index){
        vm.lastResultIndex = index;
        console.log(vm.lastResultIndex)
    };

    vm.saveCaptainResults = function () {
        vm.round.quizzes.forEach((result)=>{
            if (vm.lastResultIndex <= result.quizNum){
                result.score = vm.round.roundType.start + vm.round.roundType.step*result.quizNum;
                // vm.saveResult(vm.round.roundNum,result);
            }
            else if(vm.lastResultIndex > result.quizNum){
                console.log(result)
                ResultServiceFactory.deleteResult($routeParams.gameId,resultKey(result));
            }
        })
    }


}