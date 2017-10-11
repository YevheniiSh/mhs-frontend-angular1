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
      vm.imageSaveRef = 'img/';
      vm.gameId = $routeParams.gameId;

      vm.isGameCurrent = true;
      vm.photosUrl = '';

      vm.teamResults = function () {
        $window.open($window.location.origin + `/#!/games/${gameId}/results-presentation`, ``, `width=${screen.availWidth},height=${screen.availHeight}`);
      };

      GameService.getGameStatus(this.gameId).then(status => {
        GameService.getDate(status, this.gameId).then(v => this.date = new Date(v.$value).toLocaleDateString());
      });

      ResultService.getParsedResults(this.gameId)
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

      seasonService.getSeasonIdByGameId(vm.gameId)
        .then((seasonId) => {
          console.log('seasonId');
          console.log(seasonId);
          if (seasonId) {
            getUrlFromGameAndSeason(vm.gameId, seasonId)
          } else setGameImg()
        })
    }

    let getUrlFromGameAndSeason = function (gameId, seasonId) {
      imageService.getImgUrlFromSeasonAndGame(gameId, seasonId)
        .subscribe(([gameImgUrl, seasonImgUrl]) => {
          console.log('gameImgUrl '+ gameImgUrl);
          console.log('seasonImgUrl ' + seasonImgUrl);
          if (gameImgUrl) {
            console.log('used gameImgUrl');
            vm.shareImgUrl = gameImgUrl;
          } else if (seasonImgUrl){
            console.log('used seasonImgUrl');
            vm.shareImgUrl = seasonImgUrl;
          }
          console.log('__');
        })
    };

    let setGameImg = function () {
      imageService.getImgUrlFromFinishedGame(vm.gameId)
        .subscribe((url) => {
          console.log('gameUrl');
          if (url) {
            console.log('gameUrl');
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

    vm.setImgUrl = function (url) {
      imageService.setImgUrlToFinishedGame(url, vm.gameId);
    };

    vm.onBack = function () {
      $window.history.back();
    };
  }
})();
