angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['TeamServiceFactory', 'GameServiceFactory', '$rootScope', '$location', function (TeamService, GameService, $rootScope, $location) {

            this.results = [{
                teamName: 'SuperMan',
                rounds: [{roundNumber: 1, score: 5}, {roundNumber: 2, score: 3}, {roundNumber: 3, score: 4}],
                total: 12
            },
                {
                    teamName: 'BatMan',
                    rounds: [{roundNumber: 1, score: 3}, {roundNumber: 2, score: 1}, {roundNumber: 3, score: 1}],
                    total: 5
                },
                {
                    teamName: 'Girls',
                    rounds: [{roundNumber: 1, score: 7}, {roundNumber: 2, score: 1}, {roundNumber: 3, score: 6}],
                    total: 14
                }];
            console.log(TeamService);


        }]

    });