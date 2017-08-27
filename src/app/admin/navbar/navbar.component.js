(function () {
    angular
        .module('navbar')
        .component('navbar', {
          templateUrl: 'app/admin/navbar/navbar.html',
          css: 'app/admin/navbar/navbar.css',
            controller: ['$translate', function ($translate) {

                this.locale = $translate.use();

                this.changeLang = function (locale) {
                    this.locale = locale;
                    $translate.use(locale);
                    localStorage.setItem("locale", locale);
                }
            }]
        });

})();
