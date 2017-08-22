angular
    .module('mhs').service('LoadingInterceptor',
    ['$q', '$rootScope',
        function ($q, $rootScope) {
            'use strict';
            return {
                request: function (config) {
                    $rootScope.loading = true;
                    return config;
                },
                requestError: function (rejection) {
                    $rootScope.loading = false;
                    return $q.reject(rejection);
                },
                response: function (response) {
                    $rootScope.loading = false;
                    return response;
                },
                responseError: function (rejection) {
                    $rootScope.loading = false;
                    return $q.reject(rejection);
                }
            }
        }]).config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
}]);