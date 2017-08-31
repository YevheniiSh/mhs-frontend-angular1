angular
    .module('firebaseDataService')
    .factory('firebaseDataService', firebaseDataService);

function firebaseDataService() {

    let root = firebase.database().ref();
    return {
        auth: firebase.auth(),
        root: root,
        games: root.child('games'),
        teams: root.child('teams'),
        teamRequests: root.child('teamsRequests'),
        currentGames: root.child('games').child('current'),
        finishedGames: root.child('games').child('finished'),
        gameTemplates: root.child('gameTemplates'),
        openGames: root.child('games').child('open'),
        roundTypes: root.child('roundTypes')
    };
}