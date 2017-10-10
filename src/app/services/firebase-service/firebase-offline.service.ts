import { Injectable } from '@angular/core';
import { ConnectionService } from '../connection-service/connection.service';

@Injectable()
export class FirebaseOfflineService {

  private firebaseRef;
  private interval;
  private tickValue: number;

  private dataReferences = [
    'games/current/',
    'games/open/',
    'teams/',
    'seasons/',
    'gameTemplates/',
    'roundTypes/',
    'teamsRequests/'
  ];

  constructor(private connectionService: ConnectionService) {
    this.firebaseRef = firebase.database().ref();
  }

  public initData() {
    this.dataReferences
      .forEach((reference) => {
      this.subscribeOnData(reference);
    });
    this.enableOffline();
  }

  private subscribeOnData(reference: string) {
    this.firebaseRef.child(reference).on('value', () => {});
  }

  public enableOffline() {
    this.connectionService.online.subscribe((snap) => this.pushTick(snap));
  }

  private enableTickPusher() {
    this.interval = setInterval(() => {
      this.firebaseRef.child('/tick').set(this.tickValue);
      this.tickValue++;
    }, 5000);
  }

  private saveData() {
    firebase.database().ref().child('tick/')
      .on('value', snap => {
        if (snap.val() === this.tickValue) {
          console.log('changes saved');
        }
      });
  }

  private pushTick(isOnline: boolean) {
    this.tickValue = 0;
    if (!isOnline) {
      this.enableTickPusher();
    } else {
      clearInterval(this.interval);
      this.saveData();
    }
  }

  private enableReloadAlert() {
    window.addEventListener('beforeunload', function (e) {
      const confirmationMessage = ' ';
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    });
  }

  private disableReloadAlert() {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
    });
  }

}
