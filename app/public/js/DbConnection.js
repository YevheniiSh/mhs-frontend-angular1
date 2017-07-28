class DbConnection {
    static getConnection() {
        const config = {
            apiKey: "AIzaSyBj9d2KAMg7QmWfLCK1VwZ-jNH2LzZf65M",
            authDomain: "madheadshow-e3ad4.firebaseapp.com",
            databaseURL: "https://madheadshow-e3ad4.firebaseio.com",
            projectId: "madheadshow-e3ad4",
            storageBucket: "madheadshow-e3ad4.appspot.com",
            messagingSenderId: "564839865401"
        };
        const app = firebase.initializeApp(config);
        return app.database();
    }
}