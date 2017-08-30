angular.module('focused', [])
    .directive('focused', function() {
        return {
            scope: { focused: '=' },
            link: function(scope, element) {
                scope.$watch('focused', function(value) {
                    if(value === true) {
                        element[0].focus();
                        scope.focused = false;
                    }
                });
            }
        };
    });