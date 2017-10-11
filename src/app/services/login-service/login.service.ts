import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Downgrade } from '../../hybrid/downgrade';

@Injectable()
@Downgrade()
export class LoginService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.isAuthorisedUser(user.uid))
      .catch(() => this.logout());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isAuthorisedUser(userId) {
    const isUserAuthorised = this.db.object(`/users/${userId}`);
    return isUserAuthorised;
  }
}
