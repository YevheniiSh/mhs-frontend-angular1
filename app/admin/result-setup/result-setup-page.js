'use strict';
angular.module('resultSetup')
    .component('resultSetup', {
        templateUrl: 'admin/result-setup/result-setup-page.html',
        controller: function ResultSetupController(resultSetupService) {
            var vm = this;
            resultSetupService.getData().then((game) => {
                vm.quizzes = [];
                vm.teams = game.teams;
                vm.teamsScore = [];
                vm.quizNumber = game.currentQuiz;
                vm.currentRound = game.currentRound;
                for (let i = 1; i <= game.rounds[parseInt(game.currentRound)]; i++) {
                    vm.quizzes.push({number: i, answered: false});
                }
            })
            vm.getBtnClass = function (quizNumber) {
                if (quizNumber == vm.currentRound)
                    return 'btn-info';
                else if (quizzes[quizNumber - 1].answered) {
                    return 'btn-success';
                }
            }
            vm.setQuiz = function (quizNumber) {
                vm.quizNumber = quizNumber;
            };
            vm.setResult = function () {
                let results = [];
                angular.forEach(vm.teams, function (team, index) {
                    results.push(new Result(vm.currentRound,vm.quizNumber,team.id));
                    console.log(results);
                    //resultSetupService.setData(results[key]);
                })
                vm.quizzes[vm.quizNumber - 1].answered = true;
                if (vm.quizNumber - 1 != vm.quizzes.length) {
                    vm.quizNumber++;
                }
            };

        }
    });