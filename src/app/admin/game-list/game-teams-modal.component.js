angular.module('game-list').component('modalComponent', {
  templateUrl: 'app/admin/game-list/game-teams-modal.html',
  css: 'app/admin/game-list/game-teams-modal.css',
  bindings: {
    resolve: '<',
    cancel: "&"
  },
  controller: function () {
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items;
      $ctrl.date = $ctrl.resolve.date;
      $ctrl.cancel = $ctrl.resolve.cancel;
    };
  }
});
