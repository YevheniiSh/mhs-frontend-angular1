let app = angular.module('login');

app.factory('Auth', ['firebaseDataService', function(){
    return {
        signInWithEmailAndPassword: function (email, pass) {
            return firebase.auth().signInWithEmailAndPassword(email, pass).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });
        },
        currentUser: function () {
            var firebaseUser = firebase.auth().currentUser;
            if (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            } else {
                console.log("Signed out");
            }
        },

        signOut:function () {
            firebase.auth().signOut().then(function(firebaseUser) {
                console.log("Signed out");
            }).catch(function(error) {
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
        function (Auth,  $rootScope, $location) {
            this.login = function () {
                Auth.signInWithEmailAndPassword(this.email,this.password);
            }
            this.logout = function () {
                Auth.signOut();
            }
            this.currentUser = function () {
                Auth.currentUser();
            }
        }]
});