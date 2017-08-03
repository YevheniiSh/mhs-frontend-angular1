angular
    .module('firebaseDataService')
    .factory('firebaseDataService', [firebaseDataService]);

function firebaseDataService() {
    const config = {
        apiKey: "AIzaSyBW1FbVas8nNwUp8jU8gqWjhpjqdFqIa3g",
        authDomain: "fir-testproject-902dd.firebaseapp.com",
        databaseURL: "https://fir-testproject-902dd.firebaseio.com",
        projectId: "fir-testproject-902dd",
        storageBucket: "fir-testproject-902dd.appspot.com",
        messagingSenderId: "844314677599"
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