angular.module('convertService')
    .factory('convertServiceFactory', [
        function () {


            return {
                convertTeamsForFirebase: convertTeamsForFirebase,
                convertRoundsForFirebase: convertRoundsForFirebase,
                buildTemplateForFirebase: buildTemplateForFirebase
            };

            function convertTeamsForFirebase(teams) {
                let team = {};
                for (let i = 0; i < teams.length; i++) {
                    team[teams[i].id] = teams[i].name;
                }
                return team;
            }

            function convertRoundsForFirebase(rounds) {
                let convertedRounds = {};
                for (let i = 0; i < rounds.length; i++) {
                    convertedRounds[rounds[i].$id] = {
                        numberOfQuestions: rounds[i].numberOfQuestions,
                        name: rounds[i].name
                    };
                }
                return convertedRounds
            }

            function buildTemplateForFirebase(name, rounds) {
                let template = {};
                template.name = name;
                template.rounds = convertRoundsForFirebase(rounds);
                return template;
            }


        }]
    );