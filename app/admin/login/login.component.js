angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        controller: [
            'userAuthService',
            '$window',
            function (auth, $window) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then(user=>{
                            $window.history.back();
                        })
                        .catch(error => {
                            this.errMessage = 'Invalid e-mail or password';
                        });
                };

            }]
    });