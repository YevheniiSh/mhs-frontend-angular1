angular.module('mhs.admin')
    .controller('AddTeamsController', AddTeamsController);
function AddTeamsController() {
    var ctrl = this;

    // This would be loaded by $http etc.
    ctrl.teams = [
        {
            name: 'Superman',
        },
        {
            name: 'Batman',
        }
    ];

    ctrl.addTeam = function() {
        ctrl.teams.push({name:'Team'});
    };

    ctrl.deleteTeam = function (index) {
        if(ctrl.teams.length > 2){
            ctrl.teams.splice(index, 1);
        }
        else {
            alert('min number of teams is 2');
        }
    };

    ctrl.saveTeams = function () {
        let teamBuilder = new TeamBuilder(ctrl.teams);
        teamBuilder.setTeams();
    };

    /*ctrl.deleteHero = function(hero) {
        var idx = ctrl.list.indexOf(hero);
        if (idx >= 0) {
            ctrl.list.splice(idx, 1);
        }
    };*/
};

angular.module('mhs.admin')
    .component('addTeams', {
        controller: 'AddTeamsController',
        templateUrl: 'admin/add-teams/add-teams.html',
        bindings:{
            teams : '='

        }
    });