angular.module('game-list').component('modalComponent', {
    templateUrl: 'myModalContent.html',
    bindings: {
        resolve: '<'
    },
    controller: function () {
        var $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.items = $ctrl.resolve.items;

        };
    }
});