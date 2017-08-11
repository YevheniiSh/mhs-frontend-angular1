(function () {
    angular
        .module('navbar')
        .component('navbar', {
            templateUrl: 'admin/navbar/navbar.html',
            css: 'admin/navbar/navbar.css',
            controller: Navbar
        });

    Navbar.$inject = [];

    function Navbar() {
    }
})();