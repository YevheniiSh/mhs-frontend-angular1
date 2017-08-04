angular.module('login')
    .component('login', {
        templateUrl: "admin/login/login.html",
        controller: [
            'userAuthService',
            '$location',
            function (auth, $location) {
                this.login = function () {
                    auth.signInWithEmailAndPassword(this.email, this.password)
                        .then((user)=>{
                            $location.path("/add-teams");
                        })
                        .catch(error => {
                        this.errMessage = 'Invalid e-mail or password';
                    });
                };

            }]
    });