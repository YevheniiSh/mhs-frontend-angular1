angular.module('addTeams')
    .component('printTeams', {
        templateUrl: 'admin/add-teams/print-teams/print-teams.html',
        css: 'admin/add-teams/print-teams/print-teams.css',
        bindings: {
            teams: '='
        },
        controller: ['teamRequestService','gameRequestServiceFactory',

            function () {
                let vm = this;


            }]

    });