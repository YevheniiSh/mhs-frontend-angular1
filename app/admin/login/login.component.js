angular.module('login')
    .component('login', {
    templateUrl: "admin/login/login.html",
    controller: [
        'userAuthService',
        '$location',
        function (auth, $location) {
            this.login = function () {
                auth.signInWithEmailAndPassword(this.email, this.password);
            };
            this.logout = function () {
                auth.signOut();
            };

        }]
});