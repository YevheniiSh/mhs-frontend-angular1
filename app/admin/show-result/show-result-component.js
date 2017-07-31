angular.module('showResult')
    .component('showResult', {
        templateUrl: 'admin/show-result/show-result.html',
        controller: ['ResultServiceFactory', 'GameServiceFactory', '$rootScope', '$location', function (ResultService, GameService, $rootScope, $location) {

            function parseTeamResult(gameResults){
                let res = [];
                for ( let key in gameResults) {
                    res.push(gameResults[key]);
                }
                let roundResult={};
                res.forEach((quizResult)=>{
                    roundResult[quizResult.teamId] = {rounds:{},total:0};
                })
                res.forEach((quizResult)=>{
                    let roundScore = roundResult[quizResult.teamId].rounds[quizResult.round];
                    roundResult[quizResult.teamId].rounds[quizResult.round] =roundScore + quizResult.score ||quizResult.score
                })

                return roundResult;
            }


            ResultService.getGameResults("-KqNixymK9EZU44Xgniw")
                .then((res) => {
                    return res;
                })
                .then(parseTeamResult)
                .then((result) => {
                    this.results = result;
                    $rootScope.$apply();
                });

            // this.results = [{
            //     teamName: 'SuperMan',
            //     rounds: [{roundNumber: 1, score: 5}, {roundNumber: 2, score: 3}, {roundNumber: 3, score: 4}],
            //     total: 12
            // },
            //     {
            //         teamName: 'BatMan',
            //         rounds: [{roundNumber: 1, score: 3}, {roundNumber: 2, score: 1}, {roundNumber: 3, score: 1}],
            //         total: 5
            //     },
            //     {
            //         teamName: 'Girls',
            //         rounds: [{roundNumber: 1, score: 7}, {roundNumber: 2, score: 1}, {roundNumber: 3, score: 6}],
            //         total: 14
            //     }];

        }]

    });