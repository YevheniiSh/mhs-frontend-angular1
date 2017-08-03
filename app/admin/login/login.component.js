let app = angular.module('login');

app.factory('Auth', ['dbConnection', function(){
    return {
        signInWithEmailAndPassword: function (email, pass) {
            return firebase.auth().signInWithEmailAndPassword(email, pass).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            }).catch(function(error) {
                console.error("Authentication failed:", error);
            });;
        },
        getAuth: function () {
            var firebaseUser = firebase.auth().currentUser;
            if (firebaseUser) {
                console.log("Signed in as:", firebaseUser.uid);
            } else {
                console.log("Signed out");
            }
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
        }]
});