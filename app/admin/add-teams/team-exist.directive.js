angular.module('addTeams').directive('teamValidator', ['$q', 'TeamServiceFactory', function ($q, TeamServiceFactory) {

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$asyncValidators.teamName = function (modelValue, viewValue) {
                return TeamServiceFactory.isTeamNameExist(viewValue)
                    .then((data) => {
                        console.log(data);

                        if (data.length >= 1) {
                            return $q.reject('exists');
                        }
                        return $q.resolve(true);
                    }, function () {
                        // An error occured, should still fail
                        return $q.reject('error');
                    });
            };
        }
    };
}]);