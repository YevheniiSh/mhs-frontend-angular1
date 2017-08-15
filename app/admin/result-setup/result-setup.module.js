angular
    .module('resultSetup', ['teamFactory', 'gameFactory'])
    .run(['$animate', function ($animate) {
        $animate.enabled(false);
    }]);