import {Injectable} from '@angular/core';

import {ConnectivityService} from '../connectivity-service/connectivity.service';
import {FirebasePrefetchService} from './firebase-prefetch.service';
import {NotificationService} from '../notification-service/notification.service';


@Injectable()
export class FirebaseOfflineService {

  private firebaseRef;
  private upToDate: boolean;

  constructor(private connectivityService: ConnectivityService,
              private firebasePrefetchService: FirebasePrefetchService,
              private notificationService: NotificationService) {

    this.firebasePrefetchService.initData();
    this.firebaseRef = firebase.database().ref();
    this.upToDate = true;

    const offline$ = this.connectivityService.offline$;
    const down$ = this.connectivityService.connectionDown$;
    const up$ = this.connectivityService.connectionUp$;

    down$.subscribe(() => this.notificationService.showError('CONNECTION_LOST'));

    up$.subscribe(() => {
      this.checkFirebaseConnection();
    });

    window.addEventListener('beforeunload', this.onPageLeave());

    offline$.subscribe(state => this.upToDate = state);

  }

  private onPageLeave() {
    return (e: BeforeUnloadEvent) => {
      if (this.upToDate) {
        return;
      }
      const confirmationMessage = '\o/';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };
  }

  private checkFirebaseConnection() {
    return this.notificationService.showControlledWarning('CONNECTION_RESTORING')
      .zip(this.setTimeStamp())
      .delay(2000)
      .subscribe(([toast, timeStampId]) => {
          this.notificationService.toastrService.dismissToast(toast);
          this.removeTimestamp(timeStampId)
            .then(() => {
              this.notificationService.showSuccess('CONNECTION_RESTORED');
              this.upToDate = true;
            });
        }
      );
  }

  private setTimeStamp() {
    return this.firebaseRef
      .child('connectionTimestamps/')
      .push(firebase.database.ServerValue.TIMESTAMP)
      .then((timestamp) => {
        return timestamp.key;
      });
  }

  private removeTimestamp(id) {
    return this.firebaseRef
      .child(`connectionTimestamps/${id}`)
      .remove();
  }

}
