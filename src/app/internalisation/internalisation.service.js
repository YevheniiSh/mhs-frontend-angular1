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
    tmhDynamicLocaleProvider.localeLocationPattern(`app/translations/angular-locale_{{locale}}.js`);

  }]);

angular
  .module('internalisation')
  .factory('InternationalisationServiceFactory', ['$translate', 'tmhDynamicLocale', function ($translate, tmhDynamicLocale) {
    return {
      changeLanguage: changeLanguage,
      getLanguage: getLanguage
    }

    function changeLanguage(locale) {
      tmhDynamicLocale.set(locale);
      $translate.use(locale);
      localStorage.setItem("locale", locale);
    }

    function getLanguage() {
      let locale = localStorage.getItem("locale");
      if (locale === null) {
        localStorage.setItem("locale", "ru");
      }
      return locale;
    }
  }]);
