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
        ctrl.teams.push({name:'Team'+(ctrl.teams.length+1)});
    };

    /*ctrl.deleteHero = function(hero) {
        var idx = ctrl.list.indexOf(hero);
        if (idx >= 0) {
            ctrl.list.splice(idx, 1);
        }
    };*/
};

// angular.module('mhs.admin')
//     .component('addTeams', {
//         controller: AddTeamsController,
//         templateUrl: 'admin/add-teams/add-teams.html',
//         bindings:{
//             teams : '='
//         }
//     });