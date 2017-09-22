import { firebaseConfig } from './firebase-config';

firebase.apps.length ? firebase.database() : firebase.initializeApp(firebaseConfig).database();
