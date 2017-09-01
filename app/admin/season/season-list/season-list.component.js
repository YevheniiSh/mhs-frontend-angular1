(function () {
    angular
        .module('season')
        .component('seasonList', {
            templateUrl: 'admin/season/season-list/season-list.html',
            css: 'admin/season/season-list/season-list.css',
            controller: SeasonListController
        });

    SeasonListController.$inject = [];

    function SeasonListController() {

    }
})();