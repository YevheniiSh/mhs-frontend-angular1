angular
    .module('firebaseDataService')
    .factory('firebaseDataService', ['dbConfig', firebaseDataService]);

function firebaseDataService(config) {

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
        teams: root.child('teams'),
        currentGames: root.child('games').child('current'),
        finishedGames: root.child('games').child('finished'),
        openGames: root.child('games').child('open')
    };
}