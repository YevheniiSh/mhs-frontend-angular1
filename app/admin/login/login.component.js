let app = angular.module('login');

app.factory('Auth', ['firebaseDataService', function (firebaseDataService) {
    let auth = firebaseDataService.auth;


    return {
        signInWithEmailAndPassword: function (email, pass) {
            return auth.signInWithEmailAndPassword(email, pass).then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            }).catch(function (error) {
                console.error("Authentication failed:", error);
            });
        },
        currentUser: function () {
            let firebaseUser = auth.currentUser;
            if (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            } else {
                console.log("Signed out");
            }
        },

        signOut: function () {
            auth.signOut().then(function (firebaseUser) {
                console.log("Signed out");
            }).catch(function (error) {
                console.error("Signed out failed:", error);
            });
        }

    };
}]);

app.component('login', {
    templateUrl: "admin/login/login.html",
    controller: [
        'Auth',
        '$rootScope',
        '$location',
        function (Auth, $rootScope, $location) {
            this.login = function () {
                Auth.signInWithEmailAndPassword(this.email, this.password);
            };
            this.logout = function () {
                Auth.signOut();
            };
            this.currentUser = function () {
                Auth.currentUser();
            }
        }]
});