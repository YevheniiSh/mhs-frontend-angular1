angular.module('userAuthService')
    .factory('userAuthService', ['firebaseDataService', function (firebaseDataService) {
        let auth = firebaseDataService.auth;
        return {
            signInWithEmailAndPassword: function (email, pass) {
                return auth.signInWithEmailAndPassword(email, pass).then(function (firebaseUser) {
                    console.log("Signed in as:", firebaseUser.uid);
                }).catch(function (error) {
                    console.error("Authentication failed:", error);
                });
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