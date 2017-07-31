'use strict';
    angular
        .module('mhs.admin')
        .controller('ResultSetupController', function ResultSetupController($rootScope) {
            this.game = $rootScope.game;
            this.teams = ['Котеры','Колбаски','Какое-то очень длинное слово'];
            this.quizzes = [1,2,3,4,5,6,7,8,9,10];
            this.currentQuiz = 1;
            this.currentRound = 1;

            this.buildResult = function (game) {
                this.teams = game.teams;
                this.currentQuiz = game.currentQuiz;
                this.currentRound = game.currentRound;
            };
        });