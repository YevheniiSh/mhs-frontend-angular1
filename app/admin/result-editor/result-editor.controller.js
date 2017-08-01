angular.module('resultEditor')
    .component('resultEditor', {
        templateUrl: 'admin/result-editor/result-editor.html',
        controller: ['ResultServiceFactory', function (ResultServiceFactory) {
            ResultServiceFactory.getByRoundAndQuiz(3,2,'-Kq8WOf8_OxjxQdg8pIV').then(v=>
                this.result = v.val());
        }]

    });