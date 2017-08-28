angular.module('focused', [])
    .directive('focused', function() {
        return {
            scope: { trigger: '=focused' },
            link: function(scope, element) {
                scope.$watch('trigger', function(value) {
                    if(value === true) {
                        element[0].focus();
                        scope.trigger = false;
                    }
                });
            }
        };
    });