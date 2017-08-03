angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        controller: [
            'userAuthService',
            '$window',
            function (auth, $window) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then(()=>{
                            $window.history.back();
                            this.successfull = true;
                        })
                        .catch(function (error) {
                        this.successfull = false;
                    })
                };

            }]
    });