(function () {
    angular
        .module('season')
        .component('seasonList', {
          templateUrl: 'app/admin/season/season-list/season-list.html',
          css: 'app/admin/season/season-list/season-list.css',
            controller: SeasonListController
        });

    SeasonListController.$inject = ['seasonService', '$location'];

    function SeasonListController(seasonService, $location) {
        let vm = this;
        vm.$onInit = onInit;

        function onInit() {
            seasonService.getSeasons()
                .then(seasons => {
                    angular.forEach(seasons, season=>{
                        seasonService.getNumberOfGames(season.$id).then(numberOfGames => {
                                season.numberOfGames = numberOfGames;
                            });
                        seasonService.getSeasonWinners(season.$id).then(seasonWinners => {
                                season.seasonWinners = seasonWinners;
                            });
                    });
                    vm.seasons = seasons;
                })
        }

        vm.goToSeason = function(id){
            $location.path(`/seasons/${id}`);
        }
    }
})();
