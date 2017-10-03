(function () {
  angular.module('login')
    .component('login', {
      templateUrl: "app/admin/login/login.html",
      css: 'app/admin/login/login.css',
      controller: loginController
    });

  loginController.$inject = ['userAuthService', '$location', '$rootScope', 'login'];

  function loginController(auth, $location, $rootScope, loginService) {
    this.login = function () {
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          $rootScope.currentUser = user.email;
          redirectToPreviousPage();
        })
        .catch((err) => {
          if (err === 'rulesError') {
            this.errMessage = "INVALID_RULES_MESSAGE";
            return;
          }
          this.errMessage = "INVALID_EMAIL_MESSAGE";
        });
      loginService.login(this.email, this.password);

      function redirectToPreviousPage() {
        if (($rootScope.hasOwnProperty('beforeAuthUrl') && $rootScope.beforeAuthUrl !== '/login'))
          $location.url($rootScope.beforeAuthUrl);
        else $location.path('/games')
      }
    };
  }
})();
