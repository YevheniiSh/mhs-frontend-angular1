(function () {
    angular
        .module('season')
        .component('seasonList', {
            templateUrl: 'admin/season/season-list/season-list.html',
            css: 'admin/season/season-list/season-list.css',
            controller: SeasonListController
        });

    SeasonListController.$inject = ['seasonService'];

    function SeasonListController(seasonService) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            seasonService.getSeasonsNames()
                .then((res) => {
                    vm.seasons = res;
                })
        }
    }
})();