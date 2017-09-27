import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

declare let firebase: any;

@Injectable()
export class BackupService {
  private storageRef: any;
  private backupJsonRef: any;

  jsonToBackup: any;

  private url;
  private dbRef: any;

  constructor(db: AngularFireDatabase) {
    this.dbRef = db.object('/');
    this.storageRef = firebase.storage().ref('/backups');
  }

  public getBackupBlob(): Promise<any> {
    return new Promise((resolve, reject) => {

      const backupName: string = new Date() + 'backup.json';
      this.backupJsonRef = this.storageRef.child(backupName);

      this.dbRef.subscribe(res => {
        this.jsonToBackup = JSON.stringify(res);
        const blob = new Blob([this.jsonToBackup], { type: 'application/json' });
        // this.url = window.URL.createObjectURL(blob);
        resolve(blob);
      });
    });
  }

}
