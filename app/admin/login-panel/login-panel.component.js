angular.module('login-panel')
    .component('loginPanel', {
        templateUrl: "admin/login-panel/login-panel.html",
        controller: [
            'userAuthService',
            '$scope',
            function (userAuthService,$scope) {
            userAuthService.currentUser()
                .then(res=>{
                    this.user = res.email;
                });

            this.logOut = function () {
                userAuthService.signOut();
            }
            }]
    });