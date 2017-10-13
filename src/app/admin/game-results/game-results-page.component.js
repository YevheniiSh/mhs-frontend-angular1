(function () {
  angular
    .module('gameResultsPage')
    .component('gameResultsPage', {
      templateUrl: 'app/admin/game-results/game-results-page.html',
      css: 'app/admin/game-results/game-results-page.css',
      controller: GameResultsPageController
    });

  GameResultsPageController.$inject = ['ResultServiceFactory', 'GameServiceFactory', '$routeParams',
    '$location', '$window', 'userAuthService', 'ImageService', 'seasonService'];

  function GameResultsPageController(ResultService, GameService, $routeParams,
                                     $location, $window, userAuthService, imageService, seasonService) {

    let vm = this;

    vm.$onInit = onInit;

    let gameId = $routeParams.gameId;

    function onInit() {
      vm.urlProperty = 'imageUrl';
      vm.gameFileResource = `games/finished/${gameId}`;
      vm.fileType = 'image';
      console.log('seasonId');

      vm.isGameCurrent = true;
      vm.photosUrl = '';

      vm.teamResults = function () {
        $window.open($window.location.origin + `/#!/games/${gameId}/results-presentation`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
      };

      GameService.getGameStatus(gameId).then(status => {
        GameService.getDate(status, gameId).then(v => this.date = new Date(v.$value).toLocaleDateString());
      });

      ResultService.getParsedResults(gameId)
        .then((result) => {
          vm.results = result;
        });

      GameService.getGameStatus(gameId).then(status => {
        (status === "finished") ?
          vm.gameFinished = true : vm.gameFinished = false;
      });

      GameService.getPhotosUrl(gameId).then((res) => {
        vm.photosUrl = res;
        vm.newPhotosUrl = res;
      });

      userAuthService.currentUser()
        .then((res) => {
          vm.user = res;
        });

      seasonService.getSeasonIdByGameId(gameId)
        .then((seasonId) => {
          if (seasonId) {
            let seasonFileResource = `seasons/${seasonId}`;
            getImageUrlFromGameAndSeason(seasonFileResource)
          } else setGameImg()
        })
    }

    let getImageUrlFromGameAndSeason = function (seasonFileResource) {
      let seasonImgUrl = {
        ref: seasonFileResource,
        property: vm.urlProperty
      };

      let gameImgUrl = {
        ref: vm.gameFileResource,
        property: vm.urlProperty
      };

      imageService.getCombinedUrlProperty(gameImgUrl, seasonImgUrl)
        .subscribe(([gameImgUrl, seasonImgUrl]) => {
          if (gameImgUrl) {
            vm.shareImgUrl = gameImgUrl;
          } else if (seasonImgUrl) {
            vm.shareImgUrl = seasonImgUrl;
          }
        })
    };

    let setGameImg = function () {
      imageService.getUrlProperty(vm.gameFileResource, vm.urlProperty)
        .subscribe((url) => {
          if (url) {
            vm.shareImgUrl = url;
          }
        });
    };

    vm.shareURL = $location.absUrl();

    vm.savePhotosUrl = function () {
      GameService.setPhotosLink(gameId, vm.newPhotosUrl);
      vm.photosUrl = vm.newPhotosUrl;
      vm.linkEditor = false;
    };

    vm.editLink = function () {
      vm.newPhotosUrl = vm.photosUrl;
      vm.linkEditor = true;
    };

    vm.getTrimmedPhotosUrl = function () {
      let link = vm.photosUrl;
      let photosUrlArray = link.split('/');
      let photosUrlDomain = photosUrlArray[2];
      let photosUrlPath = photosUrlArray[3];
      let photosUrlLastCharacters = link.substring(link.length - 6);
      return photosUrlDomain + "/" + photosUrlPath + "/..." + photosUrlLastCharacters;
    };

    vm.onBack = function () {
      $window.history.back();
    };
  }
})();
