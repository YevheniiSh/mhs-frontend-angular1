import { Injectable } from '@angular/core';

@Injectable()
export class FirebasePrefetchService {

  private dataReferences = [
    'games/current/',
    'games/open/',
    'teams/',
    'seasons/',
    'gameTemplates/',
    'roundTypes/',
    'teamsRequests/'
  ];

  private firebaseRef;

  constructor() {
    this.firebaseRef = firebase.database().ref();
  }

  public initData() {
    this.dataReferences
      .forEach((reference) => {
        this.subscribeOnData(reference);
      });
  }

  private subscribeOnData(reference: string) {
    this.firebaseRef.child(reference).on('value', () => {
    });
  }

}
