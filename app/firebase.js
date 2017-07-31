angular.module('firebaseConnection', [])
    .factory('dbConnection', dbConnection);

function dbConnection(){
    const config = {
        apiKey: "AIzaSyDaYN78sZJpVnNdVx8_wlhNzl5xfv7gCqM",
        authDomain: "testproj-cd085.firebaseapp.com",
        databaseURL: "https://testproj-cd085.firebaseio.com",
        projectId: "testproj-cd085",
        storageBucket: "testproj-cd085.appspot.com",
        messagingSenderId: "743525828232"
    };

    return firebase.initializeApp(config).database;
}
