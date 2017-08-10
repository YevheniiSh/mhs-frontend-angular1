angular.module('applicationForm')
    .component('applicationForm', {
        templateUrl: 'admin/application-form/application-form.html',
        css:'admin/application-form/application-form.css',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

            }
        ]
    });