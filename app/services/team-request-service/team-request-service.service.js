angular.module('teamRequestService')
    .factory('teamRequestService', ['$firebaseArray', '$firebaseObject', 'firebaseDataService',
        function ($firebaseArray, $firebaseObject, firebaseDataService) {

            return {
                save: save,
                getTeamRequests: getTeamRequests,
            };

            function save(request) {
                let requestPath = `/${request.teamId}/${request.$id}`;
                let requestRef = firebaseDataService.teamRequests.child(requestPath);
                let requestObj = new $firebaseObject(requestRef);
                requestObj.$value = {
                    fullName: request.fullName,
                    phone: request.phone,
                    date: request.date,
                    teamName: request.teamName,
                    teamSize: request.teamSize
                };
                return requestObj.$save()
                    .then(() => {
                            return requestObj.$id;
                        }, (err) => {
                            console.log(err);
                            throw err;
                        }
                    )
            }

            function getTeamRequests(teamId) {
                let requestsRef = firebaseDataService.teamRequests.child(`${teamId}`);
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
        }]);