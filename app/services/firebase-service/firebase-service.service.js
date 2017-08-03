angular
    .module('firebaseDataService')
    .factory('firebaseDataService', [firebaseDataService]);

function firebaseDataService() {
    const config = {
        apiKey: "AIzaSyDlmBFGxhXo5KdhA0FbBYdOs99j8UvDN6I",
        authDomain: "test-99525.firebaseapp.com",
        databaseURL: "https://test-99525.firebaseio.com",
        projectId: "test-99525",
        storageBucket: "test-99525.appspot.com",
        messagingSenderId: "734509405972"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config).database();
    } else {
        firebase.database();
    }

    let root = firebase.database().ref();
    return {
        auth: firebase.auth(),
        root: root,
        games: root.child('games'),
        teams: root.child('teams')
    };
}