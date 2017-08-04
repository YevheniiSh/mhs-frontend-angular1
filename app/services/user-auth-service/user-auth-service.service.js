angular.module('userAuthService')
    .factory('userAuthService', ['firebaseDataService', '$q', function (firebaseDataService, $q) {
        let auth = firebaseDataService.auth;
        return {
            signInWithEmailAndPassword: function (email, pass) {
                let defer = $q.defer();
                auth.signInWithEmailAndPassword(email, pass)
                    .then((user) => {
                        defer.resolve(user);
                    })
                    .catch((er) =>{
                        defer.reject(er);
                    })
                return defer.promise;
            },
            isAuthenticated: function () {
                let firebaseUser = auth.currentUser;
                if (firebaseUser) {
                    return true;
                } else {
                    return false;
                }
            },
            signOut: function () {
                auth.signOut().then(function () {
                    console.log("Signed out");
                }).catch(function (error) {
                    console.error("Signed out failed:", error);
                });

            }
        };
    }]);