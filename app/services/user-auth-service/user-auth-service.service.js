angular.module('userAuthService')
    .factory('userAuthService', ['firebaseDataService','$firebaseAuth', '$q', function (firebaseDataService, $firebaseAuth, $q) {
        let auth = firebaseDataService.auth;
        return {
            signInWithEmailAndPassword: function (email, pass) {
                let defer = $q.defer();
                auth.signInWithEmailAndPassword(email, pass)
                    .then((user) => {
                        defer.resolve(user);
                    })
                    .catch((er) => {
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

            currentUser: function () {
                return $q((resolve, reject) => {
                    setTimeout(() => {
                        let firebaseUser = auth.currentUser;
                        if (firebaseUser) {
                            console.log(firebaseUser.email);
                            resolve(firebaseUser);
                        } else {
                            console.log('Not sign in');
                            reject(firebaseUser);
                        }
                    }, 300)
                });

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