angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        controller: [
            'userAuthService',
            '$window',
            '$scope',
            function (auth, $window, $scope) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then((user) => {
                            $window.history.back();
                        })
                        .catch(error => {
                            this.errMessage = 'Invalid e-mail or password';
                        });
                };

            }]
    });