angular
    .module('teamFactory')
    .factory('TeamServiceFactory', ['dbConnection', function (dbConnection) {

            let teamRef = dbConnection.ref().child('teams');
            let teamFactory = {};

            teamFactory.save = function (team) {
                return teamRef
                    .push(team)
                    .then(
                        (res) => {
                            return res;
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };

            teamFactory.updateTeamById = function (teamId, team) {
                return teamRef
                    .child(teamId)
                    .set(team)
                    .then(
                        (res) => {
                            return res;
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };

            teamFactory.getById = function (id) {
                return teamRef
                    .child(id)
                    .once('value')
                    .then(
                        (res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };

            teamFactory.getAllTeams = function () {
                return teamRef
                    .once('value')
                    .then(
                        (res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };

            teamFactory.getByGame = function (gameId) {
                return connection
                    .ref()
                    .child('games')
                    .child(gameId)
                    .child('teams')
                    .once('value')
                    .then(
                        (res) => {
                            return res.val();
                        },
                        (err) => {
                            console.log(err);
                            return err;
                        });
            };
            return teamFactory;
        }]
    );