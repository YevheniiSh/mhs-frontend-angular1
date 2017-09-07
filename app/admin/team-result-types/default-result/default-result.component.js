angular.module('teamResults')
    .component('defaultResult', {
        templateUrl: 'admin/team-result-types/default-result.html',
        css: 'admin/team-result-types/default-result.html',
        controller: defaultResultController
    });

defaultResultController.$inject = [];

function defaultResultController(){

}