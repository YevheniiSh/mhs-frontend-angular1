angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        css: 'admin/login/login.css',
        controller: [
            'userAuthService',
            '$location',
            '$rootScope',
            function (auth, $location, $rootScope) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then((user) => {
                            $rootScope.currentUser = user.email;
                            $location.path($rootScope.getPreviousLocation());
                        })
                        .catch(() => {
                            this.errMessage = "INVALID_EMAIL_MESSAGE";
                        });
                };

            }]
    });