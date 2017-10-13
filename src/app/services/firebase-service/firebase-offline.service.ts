import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConnectivityService } from '../connectivity-service/connectivity.service';
import { FirebasePrefetchService } from './firebase-prefetch.service';

@Injectable()
export class FirebaseOfflineService {

  private firebaseRef;

  constructor(private connectivityService: ConnectivityService,
              private firebasePrefetchService: FirebasePrefetchService) {

    this.firebasePrefetchService.initData();
    this.firebaseRef = firebase.database().ref();

    this.connectivityService = new ConnectivityService();

    const down$ = this.connectivityService.connectionDown$;
    const up$ = this.connectivityService.connectionUp$;

    up$.subscribe(() => { this.setTimeStamp(); });

    const pageLeave$ = Observable.fromEvent(window, 'beforeunload');

    down$
      .switchMap(c => pageLeave$.takeUntil(up$))
      .subscribe(preventPageLeave);
  }

  private setTimeStamp() {
    return this.firebaseRef
      .child('tick')
      .push(firebase.database.ServerValue.TIMESTAMP);
  }

}

function preventPageLeave(e: BeforeUnloadEvent) {
  const confirmationMessage = '\o/';
  e.returnValue = confirmationMessage;
  return confirmationMessage;
}
