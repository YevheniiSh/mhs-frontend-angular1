import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class ConnectionService {

  private url = '/assets/connection.json';

  public connectionState$: Observable<boolean>;
  public online$: Observable<boolean>;
  public offline$: Observable<boolean>;
  public connectionUp$: Observable<boolean>;
  public connectionDown$: Observable<boolean>;

  constructor() {
    this.connectionState$ = this.getConnectionState();
    this.online$ = this.connectionState$.filter(state => state);
    this.offline$ = this.connectionState$.filter(state => !state);
    this.connectionUp$ = this.online$.skipUntil(this.offline$);
    this.connectionDown$ = this.offline$.skipUntil(this.online$);
  }

  private getConnectionState() {
    return IntervalObservable
      .create(5000)
      .switchMap((onlineStatus) => Observable.fromPromise(this.checkOnline()))
      .distinctUntilChanged();
  }

  private checkOnline() {
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
