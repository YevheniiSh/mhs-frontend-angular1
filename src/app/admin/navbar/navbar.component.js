(function () {
    angular
        .module('navbar')
        .component('navbar', {
          templateUrl: 'app/admin/navbar/navbar.html',
          css: 'app/admin/navbar/navbar.css',
          controller: ['$translate', 'tmhDynamicLocale', function ($translate, tmhDynamicLocale) {

                this.locale = $translate.use();

                this.changeLang = function (locale) {
                  tmhDynamicLocale.set(locale);
                    this.locale = locale;
                    $translate.use(locale);
                    localStorage.setItem("locale", locale);
                }
            }]
        });

})();
