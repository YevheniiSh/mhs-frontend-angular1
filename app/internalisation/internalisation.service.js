angular
    .module('internalisation')
    .config(['$translateProvider', 'tmhDynamicLocaleProvider', function ($translateProvider, tmhDynamicLocaleProvider) {


        var locale = localStorage.getItem("locale")
        if (locale === null) {
            localStorage.setItem("locale", "ru");
        }

        $translateProvider
            .useStaticFilesLoader({
                files: [{
                    prefix: '/translations/',
                    suffix: '.json'
                }
                ]
            })
            .preferredLanguage(localStorage.getItem("locale"))
            .useMissingTranslationHandlerLog();

        tmhDynamicLocaleProvider.defaultLocale(locale);
        tmhDynamicLocaleProvider.localeLocationPattern(`/bower_components/angular-i18n/angular-locale_{{locale}}.js`);

    }]);
