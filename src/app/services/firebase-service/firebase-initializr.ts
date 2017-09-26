import { firebaseConfig } from './firebase-config';
declare const firebase: any;

firebase.apps.length ? firebase.database() : firebase.initializeApp(firebaseConfig).database();
