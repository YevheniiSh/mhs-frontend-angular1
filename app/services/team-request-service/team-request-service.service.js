angular.module('teamRequestService')
    .factory('teamRequestServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let openGameRef = firebaseDataService.openGames;


            return {
                save: save,
                getTeamRequest: getTeamRequest,
                getAllTeamRequestsByGameId: getAllTeamRequestsByGameId
            }

            function save(gameId, teamRequest) {
                let teamRequestRef = openGameRef.child(`${gameId}/requests`);
                let teamRequestObj = new $firebaseObject(teamRequestRef.push());
                teamRequestObj.$value = teamRequest;
                return teamRequestObj.$save()
                    .then(
                        () => {
                            return teamRequestObj.$id;
                        }, (err) => {
                            console.log(err);
                            throw err;
                        }
                    )
            }

            function getTeamRequest(gameId, teamRequestId) {
                let teamRequestRef = openGameRef.child(`${gameId}/requests/${teamRequestId}`);
                return new $firebaseObject(teamRequestRef)
                    .$loaded()
                    .then(
                        (res) => {
                            return res;
                        },
                        (err) => {
                            console.log(err);
                            throw err;
                        }
                    )
            }

            function getAllTeamRequestsByGameId(gameId) {
                let requestsRef = openGameRef.child(`${gameId}/requests`);
                return new $firebaseArray(requestsRef)
                    .$loaded()
                    .then(
                        (teamsRequests) => {
                            return teamsRequests;
                        },
                        (err) => {
                            console.log(err);
                            throw err;
                        }
                    )
            }
        }]
    );