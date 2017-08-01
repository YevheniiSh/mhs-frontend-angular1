angular.module('firebaseConnection', [])
    .factory('dbConnection', dbConnection);

function dbConnection(){
    const config = {
        apiKey: "AIzaSyBj9d2KAMg7QmWfLCK1VwZ-jNH2LzZf65M",
        authDomain: "madheadshow-e3ad4.firebaseapp.com",
        databaseURL: "https://madheadshow-e3ad4.firebaseio.com",
        projectId: "madheadshow-e3ad4",
        storageBucket: "madheadshow-e3ad4.appspot.com",
        messagingSenderId: "564839865401"
    };

    if (!firebase.apps.length) {
        return firebase.initializeApp(config).database();
    } else {
        return firebase.database();
    }
}
