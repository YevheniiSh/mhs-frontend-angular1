angular.module('teamResults')
    .component('captainResult', {
        templateUrl: 'admin/team-result-types/captain-result/captain-result.html',
        css: 'admin/team-result-types/captain-result/captain-result.css',
        controller: captainResultController,
        bindings: {
            results: '=',
            saveResult: '&'
        }
    });

captainResultController.$inject = [];

function captainResultController(){

}