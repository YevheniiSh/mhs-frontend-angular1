(function () {
    angular.module('login-panel')
        .component('loginPanel', {
          templateUrl: "app/admin/login-panel/login-panel.html",
          css: 'app/admin/login-panel/login-panel.css',
            controller: LoginPanel
        });

  LoginPanel.$inject = ['userAuthService', '$location', '$rootScope', 'login'];

  function LoginPanel(userAuthService, $location, $rootScope, loginService) {
        this.logOut = function () {
            userAuthService.signOut()
                .then(() => {
                    $rootScope.currentUser = null;
                    this.redirectToLogIn();
                });
          loginService.logout();
        };

        this.redirectToLogIn = function () {
          $rootScope.beforeAuthUrl = $location.url();
          $location.path('/login');
        }
    }
})();
