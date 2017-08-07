angular.module('login-panel')
    .component('loginPanel', {
        templateUrl: "admin/login-panel/login-panel.html",
        controller: ['userAuthService', '$location', LoginPanel]
    });

function LoginPanel(userAuthService, $location) {
    this.logOut = function () {
        userAuthService.signOut();
        $location.path('/#!/login');
    }
}