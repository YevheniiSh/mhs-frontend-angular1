class DbConnection {
    static getConnection() {
        const config = {
            apiKey: "AIzaSyDlmBFGxhXo5KdhA0FbBYdOs99j8UvDN6I",
            authDomain: "test-99525.firebaseapp.com",
            databaseURL: "https://test-99525.firebaseio.com",
            projectId: "test-99525",
            storageBucket: "test-99525.appspot.com",
            messagingSenderId: "734509405972"
        };

        if (!firebase.apps.length) {
            return firebase.initializeApp(config).database();
        } else {
            return firebase.database();
        }
    }
}