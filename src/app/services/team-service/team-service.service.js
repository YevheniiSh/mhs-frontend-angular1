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
                getByGame: getByGame,
                isTeamNameExist: isTeamNameExist,
                changeTeamName: changeTeamName,
                checkTeamNameCoincidence: checkTeamNameCoincidence
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
                    .$loaded();
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

            function isTeamNameExist(teamName) {
                return new $firebaseArray(firebaseDataService.teams.orderByChild('name').equalTo(teamName)).$loaded();
            }

            function changeTeamName(teamId, newTeamName) {
                let obj = $firebaseObject(teamRef.child(teamId));
                obj.name = newTeamName;
                obj.$save();
                return obj.$loaded()
                    .then((res) => {
                        return res;
                    })
            }

            function checkTeamNameCoincidence(teamName) {
                return getAllTeams()
                    .then((res) => {
                        for (team of res) {
                            if (team.name === teamName.toString()) return true;
                        }
                        return false;
                    });
            }
        }]
    );