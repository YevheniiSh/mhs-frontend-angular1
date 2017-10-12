import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class ConnectivityService {

  private url = '/assets/connection.json';

  public connectionState$: Subject<boolean>;
  public online$: Observable<boolean>;
  public offline$: Observable<boolean>;
  public connectionUp$: Observable<boolean>;
  public connectionDown$: Observable<boolean>;

  constructor() {
    this.initConnectionState();
    this.online$ = this.connectionState$.filter(state => state);
    this.offline$ = this.connectionState$.filter(state => !state);
    this.connectionUp$ = this.online$.skipUntil(this.offline$);
    this.connectionDown$ = this.offline$.skipUntil(this.online$);
  }

  private initConnectionState() {
    this.connectionState$ = new Subject<boolean>();

    Observable
      .interval(5000)
      .switchMap(i => this.checkOnline())
      .distinctUntilChanged()
      .subscribe(this.connectionState$);
  }

  private checkOnline() {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve) => {
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
