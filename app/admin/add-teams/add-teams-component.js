angular.module('mhs.admin')
    .component('addTeams', {
        controller: AddTeamsController,
        templateUrl: 'admin/add-teams/add-teams.html',
        bindings:{
            teams : '='
        }
    });