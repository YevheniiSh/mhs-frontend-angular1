angular
    .module('internalisation')
    .config(['$translateProvider', function ($translateProvider) {

        if (localStorage.getItem("locale") === null) {
            localStorage.setItem("locale", "ru");
        }

        $translateProvider
            .useStaticFilesLoader({
                prefix: '/translations/',
                suffix: '.json'
            })
            .preferredLanguage(localStorage.getItem("locale"))
            .useMissingTranslationHandlerLog();
    }]);