angular
    .module('mhs.admin', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/example-admin', {
            templateUrl: 'admin/some-admin-feature/some-admin-feature-html.html',
            controller: 'SomeAdminFeatureController'
        });
    }]);