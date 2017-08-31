angular.module('test')
    .component('test', {
        templateUrl: 'admin/test/test.html',
        controller: test
    });

test.$inject = [];

function test() {
    this.list1 = {title: 'AngularJS - Drag Me'};
    this.list2 = {};
}