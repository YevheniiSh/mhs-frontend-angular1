angular.module('firebaseConnection', [])
    .factory('dbConnection', dbConnection);

function dbConnection(){
    const config = {
        apiKey: "AIzaSyBW1FbVas8nNwUp8jU8gqWjhpjqdFqIa3g",
        authDomain: "fir-testproject-902dd.firebaseapp.com",
        databaseURL: "https://fir-testproject-902dd.firebaseio.com",
        projectId: "fir-testproject-902dd",
        storageBucket: "fir-testproject-902dd.appspot.com",
        messagingSenderId: "844314677599"
    };

    if (!firebase.apps.length) {
        return firebase.initializeApp(config).database();
    } else {
        return firebase.database();
    }
}
