angular.module('teamResults')
    .component('defaultResult', {
        templateUrl: 'admin/team-result-types/default-result/default-result.html',
        css: 'admin/team-result-types/default-result/default-result.css',
        controller: defaultResultController
    });

defaultResultController.$inject = [];

function defaultResultController(){

}