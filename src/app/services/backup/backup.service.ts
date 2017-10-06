import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class BackupService {

  constructor(private db: AngularFireDatabase) {
  }

  public getDataBase(): FirebaseObjectObservable<any> {
    return this.db.object('/');
  }

}
