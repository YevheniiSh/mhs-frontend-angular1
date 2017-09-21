import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class LoginService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.isAuthorisedUser(user.uid).subscribe(firebaseObject => {
            firebaseObject;
          },
          error => {
            this.logout();
            throw "rulesError"
          })

      })

  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuthorisedUser(userId) {
    const isUserAuthorised = this.db.object(`/users/${userId}`);
    console.log(isUserAuthorised);
    return isUserAuthorised;
  }
}
