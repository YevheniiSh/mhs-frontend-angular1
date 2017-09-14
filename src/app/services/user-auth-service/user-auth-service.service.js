angular.module('userAuthService')
  .factory('userAuthService', ['firebaseDataService', '$firebaseAuth', '$q', '$firebaseObject', function (firebaseDataService, $firebaseAuth, $q, $firebaseObject) {
        let auth = firebaseDataService.auth;
    let usersRef = firebaseDataService.users;
        return {
            signInWithEmailAndPassword: function (email, pass) {
                let defer = $q.defer();
                auth.signInWithEmailAndPassword(email, pass)
                    .then((user) => {
                      this.isAuthorisedUser(user.uid)
                        .then((value) => {
                          if (value) {
                            defer.resolve(user);
                          }
                          else {
                            this.signOut();
                            defer.reject("Error");
                          }
                        })
                    })
                    .catch((er) => {
                        defer.reject(er);
                    });
                return defer.promise;
            },

          isAuthorisedUser: function (uid) {
            let fbObj = $firebaseObject(usersRef.child(uid));
            return fbObj.$loaded()
              .then((res) => {
                console.log(res);
                if (res.$value) {
                  return res.$value;
                }
                else {
                  return false
                }
              })
              .catch((er) => {
                return false
              });
          },

            isAuthenticated: function () {
                let defer = $q.defer();
                auth.onAuthStateChanged(function(user) {
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
                auth.onAuthStateChanged(function(user) {
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
                    })
                return defer.promise;
            }
        };
    }]);
