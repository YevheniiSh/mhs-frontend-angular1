angular
    .module('mhs.admin')
    .controller('TestController', TestController);

function TestController() {
    let vm = this;

    vm.gameType = false;

    this.showGameType = function () {
        vm.gameType = true;
    }
}