import { userAuthServiceModule } from "./user-auth-service.module";
import '../firebase-service/firebase-service.service';

(function () {
  userAuthServiceModule
    .factory('userAuthService', ['firebaseDataService', '$firebaseAuth', '$q',
      function (firebaseDataService, $firebaseAuth, $q) {
        let auth = firebaseDataService.auth;
        return {
          signInWithEmailAndPassword: function (email, pass) {
            let defer = $q.defer();
            auth.signInWithEmailAndPassword(email, pass)
              .then((user) => {
                defer.resolve(user);
              })
              .catch((er) => {
                defer.reject(er);
              });
            return defer.promise;
          },

          isAuthenticated: function () {
            let defer = $q.defer();
            auth.onAuthStateChanged(function (user) {
              if (user) {
                defer.resolve(true);
              } else {
                defer.reject(false);
              }

            });
            return defer.promise;
          },

          currentUser: function () {
            let defer = $q.defer();
            auth.onAuthStateChanged(function (user) {
              if (user) {
                defer.resolve(user);
              } else {
                defer.reject(null);
              }

            });
            return defer.promise;
          },
          signOut: function () {
            let defer = $q.defer();
            auth.signOut()
              .then((user) => {
                defer.resolve(user);
              })
              .catch((er) => {
                defer.reject(er);
              });
            return defer.promise;
          }
        };
      }]);
})();
