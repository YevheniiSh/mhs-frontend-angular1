angular
    .module('firebaseDataService')
    .factory('firebaseDataService', [firebaseDataService]);

function firebaseDataService() {
    const config = {
        apiKey: "AIzaSyBj9d2KAMg7QmWfLCK1VwZ-jNH2LzZf65M",
        authDomain: "madheadshow-e3ad4.firebaseapp.com",
        databaseURL: "https://madheadshow-e3ad4.firebaseio.com",
        projectId: "madheadshow-e3ad4",
        storageBucket: "madheadshow-e3ad4.appspot.com",
        messagingSenderId: "564839865401"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config).database();
    } else {
        firebase.database();
    }

    let root = firebase.database().ref();
    return {
        root: root,
        games: root.child('games'),
        teams: root.child('teams'),
        currentGames: root.child('games').child('current'),
        finishedGames: root.child('games').child('finished')
    };
}