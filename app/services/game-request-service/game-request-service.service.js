angular.module('gameRequestService')
    .factory('gameRequestServiceFactory', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            let openGameRef = firebaseDataService.openGames;

            return {
                save: save,
                getTeamRequest: getTeamRequest,
                getTeamRequestStatus: getTeamRequestStatus,
                setArchivedStatus: setArchivedStatus,
                setConfirmedStatus: setConfirmedStatus,
                setUnconfirmedStatus: setUnconfirmedStatus,
                getAllTeamRequestsByGameId: getAllTeamRequestsByGameId,
                updateTeamSize: updateTeamSize,
                updateTeamId:updateTeamId
            };


            function updateTeamId(gameId, request) {
                let requestTeamId = new $firebaseObject(openGameRef.child(`${gameId}/requests/${request.$id}/teamId/`));
                requestTeamId.$value = request.teamId;
                console.log(request.teamId);
                return requestTeamId.$save()
                    .then((res) => {
                        return res.$value;
                    });
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
                    .$loaded();
            }

            function getAllTeamRequestsByGameId(gameId) {
                let requestsRef = openGameRef.child(`${gameId}/requests`);
                return new $firebaseArray(requestsRef)
                    .$loaded();
            }

            function getTeamRequestStatus(gameId, requestId) {
                let requestStatus = new $firebaseObject(openGameRef.child(`${gameId}/requests/${requestId}/status`));
                return requestStatus.$loaded()
                    .then((res) => {
                        return res.$value;
                    });
            }

            function setStatus(gameId, requestId, status) {
                let requestStatus = new $firebaseObject(openGameRef.child(`${gameId}/requests/${requestId}/status`));
                requestStatus.$value = status;
                console.log(requestStatus);
                return requestStatus.$save()
                    .then((res) => {
                        return res.$value;
                    });
            }

            function setArchivedStatus(gameId, requestId) {
                return setStatus(gameId, requestId, 'archived');
            }

            function setConfirmedStatus(gameId, requestId) {
                return setStatus(gameId, requestId, 'confirmed');
            }

            function setUnconfirmedStatus(gameId, requestId) {
                return setStatus(gameId, requestId, 'unconfirmed');
            }

            function updateTeamSize(gameId, requestId, numberOfPlayers) {
                let teamSize = new $firebaseObject(openGameRef.child(`${gameId}/requests/${requestId}/teamSize`));
                teamSize.$value = numberOfPlayers;
                teamSize.$save();
                return teamSize.$loaded();
            }
        }]
    );