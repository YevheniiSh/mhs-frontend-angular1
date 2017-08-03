angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        controller: [
            'userAuthService',
            '$window',
            '$scope',
            function (auth, $window,$scope) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then((user)=>{
                            console.log(user.email);
                            // $window.history.back();
                        })
                        .catch(function (error) {
                        this.successfull = 'Error';
                        console.log(error.message);
                    });
                };

            }]
    });