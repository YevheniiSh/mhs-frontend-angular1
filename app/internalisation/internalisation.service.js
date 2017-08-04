angular
    .module('internalisation')
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider
            .useStaticFilesLoader({
                prefix: '/translations/',
                suffix: '.json'
            })
            .preferredLanguage('ru')
            .useMissingTranslationHandlerLog();
    }]);