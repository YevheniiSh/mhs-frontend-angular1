angular.module('convertService')
    .factory('convertServiceFactory', [
        function () {


            return {
                convertTeamsForFirebase: convertTeamsForFirebase,
                convertRoundsForFirebase: convertRoundsForFirebase,
                convertDate: convertDate,
                convertTime: convertTime,
                buildTemplateForFirebase: buildTemplateForFirebase,
                convertTimeFromFirebase: convertTimeFromFirebase,
                convertTimeForView: convertTimeForView
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
                    convertedRounds[i] = {
                        numberOfQuestions: rounds[i].numberOfQuestions,
                        name: rounds[i].name
                    };
                }
                return convertedRounds
            }

            function buildTemplateForFirebase(template) {
                template.rounds = convertRoundsForFirebase(template.rounds);
                return template;
            }


            function convertDate(date) {
                let dd = date.getDate();
                let mm = date.getMonth() + 1; //January is 0!

                let yyyy = date.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                return mm + '/' + dd + '/' + yyyy;
            }

            function convertTime(time) {
                let hh = time.getHours();
                let mm = time.getMinutes();

                if (hh < 10) {
                    hh = '0' + hh;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                return hh + ':' + mm;
            }

            function convertTimeFromFirebase(time) {
                let date = new Date();
                time = time.split(":");

                date.setHours(time[0]);
                date.setMinutes(time[1]);
                date.setSeconds(0);
                return date
            }

            function convertTimeForView(time) {
                if (time === undefined)
                    return;

                let hours;
                let minutes;

                if (time.getHours() < 10) {
                    hours = '0' + time.getHours();
                } else hours = time.getHours();
                if (time.getMinutes() < 10) {
                    minutes = '0' + time.getMinutes();
                } else minutes = time.getMinutes();

                return hours + ':' + minutes;
            }


        }]
    );