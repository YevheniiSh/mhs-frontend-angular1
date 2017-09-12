angular.module('mhs').directive('outsideClick', ['$document', function ($document) {
    return {
        link: function ($scope, element, attrs) {
            let onDocumentClick = function () {
                let scopeExpression = attrs.outsideClick;

                element.bind('mouseenter', function () {
                    element.mouseLeave = false;
                });

                element.bind('mouseleave', function () {

                    element.mouseLeave = true
                });

                if (element.mouseLeave) {
                    element.mouseLeave = false;

                    $scope.$apply(scopeExpression);
                }
            };

            $document.on("click", onDocumentClick);

            element.on('$destroy', function () {
                $document.off("click", onDocumentClick);
            });
        }
    };
}]);