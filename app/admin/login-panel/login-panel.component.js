angular.module('login-panel')
    .component('loginPanel', {
        templateUrl: "admin/login-panel/login-panel.html",
        css: 'admin/login-panel/login-panel.css',
        controller: ['userAuthService', '$location', '$rootScope', LoginPanel]
    });

function LoginPanel(userAuthService, $location, $rootScope) {
    this.logOut = function () {
        userAuthService.signOut()
            .then(() => {
                $rootScope.currentUser = null;
                $location.path('/login');
            });
    }
}