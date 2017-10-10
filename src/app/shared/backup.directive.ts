import { Directive, ElementRef, HostListener } from '@angular/core';
import { firebaseConfig } from '../services/firebase-service/firebase-config';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[mhsBackup]',
  providers: [DatePipe]
})
export class BackupDirective {

  private idToken: string;

  constructor(private el: ElementRef, private http: HttpClient, public datePipe: DatePipe) {
    el.nativeElement.style.cursor = 'pointer';
    firebase.auth().currentUser.getToken()
      .then((idToken) => {
        this.idToken = idToken;
      });
  }

  @HostListener('click')
  onClick() {
    this.http.get(`${firebaseConfig.databaseURL}/.json?auth=${this.idToken}`, { responseType: 'text' })
      .subscribe(data => {
        let file = new Blob([data], { type: 'text/json' });
        let url = window.URL.createObjectURL(file);
        this.downloadBackup(url);
      });
  }

  private downloadBackup(url) {
    let a = document.createElement('a');
    a.setAttribute('href', url);
    let fileName = this.datePipe.transform(new Date(), 'medium');
    a.setAttribute('download', `backupMHS${fileName}.json`);
    a.click();
  }

}
