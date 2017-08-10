angular.module('applicationForm')
    .component('applicationForm', {
        templateUrl: 'admin/application-form/application-form.html',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

            }
        ]
    });