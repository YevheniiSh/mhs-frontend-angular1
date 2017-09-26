import { Inject, Injectable } from '@angular/core';

declare let firebase: any;

@Injectable()
export class BackupService {
  private storageRef: any;
  private backupJsonRef: any;

  jsonToBackup: any;

  private dbRef: any;

  constructor(@Inject('firebaseDataService') firebaseDataService) {
    this.dbRef = firebaseDataService.root.child('/');
    this.storageRef = firebase.storage().ref('/backups');
  }


  public saveBackup(): Promise<any> {
    return new Promise((resolve, reject) => {

      const backupName: string = new Date() + 'backup.json';
      this.backupJsonRef = this.storageRef.child(backupName);

      this.dbRef.once('value')
        .then(res => {
          this.jsonToBackup = JSON.stringify(res.val());
          const blob = new Blob([this.jsonToBackup], { type: 'application/json' });
          const url = window.URL.createObjectURL(blob);
          resolve(url);
          console.log(url);
        });
      // .then(() => {
      //   this.backupJsonRef.putString(this.jsonToBackup).then(function (snapshot) {
      //     console.log('backup Created!');
      //     resolve('backup Created! ' + backupName);
      //   }, () => {
      //     reject('backup not! Created');
      //   });
      // });
    });
  }

}
