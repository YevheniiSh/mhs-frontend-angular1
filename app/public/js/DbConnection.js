class DbConnection {
    static getConnection() {
        const config = {
            apiKey: "AIzaSyDBaZIQ4HQy4_v4lOjFAxDNvsA47uJGAXM",
            authDomain: "test-41ed5.firebaseapp.com",
            databaseURL: "https://test-41ed5.firebaseio.com",
            projectId: "test-41ed5",
            storageBucket: "test-41ed5.appspot.com",
            messagingSenderId: "611265693951"
        };

        if (!firebase.apps.length) {
            return firebase.initializeApp(config).database();
        } else {
            return firebase.database();
        }
    }
}