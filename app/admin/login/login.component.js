angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        controller: [
            'userAuthService',
            '$location',
            '$rootScope',
            function (auth, $location, $rootScope) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then((user) => {
                            $rootScope.currentUser = user.email;
                            $location.path("/add-teams");
                        })
                        .catch(error => {
                            this.errMessage = 'Invalid e-mail or password';
                        });
                };

            }]
    });