import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class ConnectionService {

  private url = '/assets/connection.json';

  public online: Observable<boolean>;

  constructor() {
    this.online = IntervalObservable
      .create(2000)
      .switchMap((onlineStatus) => Observable.fromPromise(this.checkOnline()))
      .distinctUntilChanged();
  }

  checkOnline() {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        resolve(true);
      };
      xhr.onerror = () => {
        resolve(false);
      };
      xhr.open('GET', this.url, true);
      xhr.send();
    });
  }

}
