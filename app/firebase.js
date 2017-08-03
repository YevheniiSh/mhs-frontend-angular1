angular.module('mhs')
    .factory('dbConnection',['dbConfig', function(dbConfig){
        if (!firebase.apps.length) {
            return firebase.initializeApp(dbConfig).database();
        } else {
            return firebase.database();
        }
    }]);