angular.module('userAuthService')
    .factory('userAuthService', ['firebaseDataService', function (firebaseDataService) {
        let auth = firebaseDataService.auth;
        return {
            signInWithEmailAndPassword: function (email, pass) {
                return auth.signInWithEmailAndPassword(email, pass);
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