angular
    .module('teamFactory')
    .factory('TeamServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService', '$q',
        function ($firebaseArray, $firebaseObject, firebaseDataService, $q) {

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
                return new $firebaseArray(teamRef)
                    .$loaded()
                    .then((res) => {
                        let teams = [];
                        angular.forEach(res, (team) => {
                            teams.push(team);
                        });
                        return teams;


                        // res.$ref(teamRef.child('/asddfs')).$add({name: 'pipi'})
                        //     .$loaded()
                        //     .then(() => {
                        //         res.$ref(teamRef.child('-KqbzkyiHJAXc-e9ipiP')).remove();
                        //     })
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }

            function getByGame(gameId) {
                return new $firebaseObject(firebaseDataService.games
                    .child(`${gameId}/teams`))
                    .$loaded()
                    .then((res) => {
                        return res;
                    }, (err) => {
                        console.error(err);
                        return err;
                    });
            }
        }]
    );