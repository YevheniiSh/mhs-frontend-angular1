angular.module('login')
    .component('login', {
      templateUrl: "app/admin/login/login.html",
      css: 'app/admin/login/login.css',
        controller: [
            'userAuthService',
            '$location',
            '$rootScope',
          'login',
          function (auth, $location, $rootScope, loginService) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then((user) => {
                            $rootScope.currentUser = user.email;
                            $location.path($rootScope.getPreviousLocation());
                        })
                        .catch((err) => {
                            if (err === 'rulesError'){
                              this.errMessage = "INVALID_RULES_MESSAGE";
                              return;
                            }
                            this.errMessage = "INVALID_EMAIL_MESSAGE";
                        });
                  loginService.login(this.email, this.password);
                };

            }]
    });
