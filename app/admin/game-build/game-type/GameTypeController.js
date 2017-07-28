angular
    .module('mhs.admin')
    .controller('GameTypeController', GameTypeController);

function GameTypeController($scope) {
    let vm = this;
    vm.title = 'test';
}