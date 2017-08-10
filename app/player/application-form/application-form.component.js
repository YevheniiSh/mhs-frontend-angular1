angular.module('applicationForm')
    .component('applicationForm', {
        templateUrl: 'player/application-form/application-form.html',
        css:'player/application-form/application-form.css',
        controller: ['TeamServiceFactory',
            'GameServiceFactory',
            '$rootScope',
            '$location',

            function (TeamService, GameService, $rootScope, $location) {

            }
        ]
    });