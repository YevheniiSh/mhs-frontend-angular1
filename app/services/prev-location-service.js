angular
    .module('mhs')
    .run(function ($rootScope, $location) {

        let history = [];

        $rootScope.$on('$routeChangeSuccess', function () {
            history.push($location.$$path);
        });

        $rootScope.getPreviousLocation = function () {
            return history.length > 1 ? history.splice(-2)[0] : "/";
        };

    });