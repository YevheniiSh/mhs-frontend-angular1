angular
  .module('internalisation')
  .config(['$translateProvider', 'tmhDynamicLocaleProvider', function ($translateProvider, tmhDynamicLocaleProvider) {


    let locale = localStorage.getItem("locale");
    if (locale === null) {
      localStorage.setItem("locale", "ru");
    }

    $translateProvider
      .useStaticFilesLoader({
        files: [{
          prefix: 'app/translations/',
          suffix: '.json'
        }
        ]
      })
      .preferredLanguage(localStorage.getItem("locale"))
      .useMissingTranslationHandlerLog();

    tmhDynamicLocaleProvider.defaultLocale(locale);
    tmhDynamicLocaleProvider.localeLocationPattern(`app/bower_components/angular-i18n/angular-locale_{{locale}}.js`);

  }]);
