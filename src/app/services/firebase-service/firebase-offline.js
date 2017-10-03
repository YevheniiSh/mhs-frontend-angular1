import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

'use strict';

angular
  .module('firebaseDataService')
  .factory('firebaseOfflineService', firebaseOfflineService);

function firebaseOfflineService() {

  const isOnline = require('is-online');

  return {
    enableOffline: enableOffline,
    isConnected: isConnected
  };

  function enableOffline() {
    let gameId = localStorage.getItem('currentGameId');

    isConnected()
      .subscribe(connected => {
        if(connected){
          updateGameFromStorage(gameId, getLocalGame());
        }
        else {
          setGameFromStorage(gameId, getLocalGame());
        }
      })
  }

  function getLocalGame() {
    return JSON.parse(localStorage.getItem('currentGame'));
  }

  function setGameFromStorage(gameId, localGame) {
    firebase.database().ref(`games/current/${gameId}`).set(localGame);
  }

  function updateGameFromStorage(gameId, localGame) {
    firebase.database().ref(`games/current/${gameId}`).update(localGame);
  }

  function isConnected() {
    return IntervalObservable
      .create(2000)
      .switchMap((test) => Observable.fromPromise(isOnline()))
      .distinctUntilChanged();
  }

}

