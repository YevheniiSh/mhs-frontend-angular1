angular
    .module('teamFactory')
    .factory('TeamServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let teamRef = firebaseDataService.teams;

            return {
                save: save,
                updateTeamById: updateTeamById,
                getById: getById,
                getAllTeams: getAllTeams,
                getByGame: getByGame
            };

            function save(team) {
                let obj = new $firebaseObject(teamRef.push());
                obj.$value = team;
                obj.$save();
                return obj
                    .$loaded()
                    .then((res) => {
                        return {key: res.$id, name: res.name};
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function updateTeamById(teamId, team) {
                let obj = new $firebaseObject(teamRef.child(teamId));
                obj.$value = team;
                obj.$save();
                return obj
                    .$loaded()
                    .then((res) => {
                        return {key: res.$id};
                    }, (err) => {
                        console.error(err);
                        return err;
                    })
            }

            function getById(id) {
                return new $firebaseObject(teamRef.child(id))
                    .$loaded()
                    .then((res) => {
                        return res;
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function getAllTeams() {
                // return $firebaseArray(teamRef)
                //     .$loaded()
                //     .then((res) => {
                //         console.log(res)
                //     }, (err) => {
                //         console.error(err);
                //         return err;
                //     })

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
            }

            function getByGame(gameId) {
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
            }
        }]
    );