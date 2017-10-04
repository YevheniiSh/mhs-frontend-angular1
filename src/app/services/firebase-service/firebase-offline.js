'use strict';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
const isOnline = require('is-online');

angular
  .module('firebaseDataService')
  .factory('firebaseOfflineService', firebaseOfflineService);

function firebaseOfflineService() {

  return {
    enableOffline: enableOffline,
    isConnected: isConnected
  };

  function enableOffline() {
    let gameId = localStorage.getItem('currentGameId');
    updateGameFromStorage(gameId, getLocalGame());
  }

  function getLocalGame() {
    return JSON.parse(localStorage.getItem('currentGame'));
  }

  function updateGameFromStorage(gameId, localGame) {
    let game = {};
    game[gameId] = localGame;
    let currentGamesRef = firebase.database().ref('games/current');
    return currentGamesRef.update(game);
  }

  function isConnected() {
    return IntervalObservable
      .create(2000)
      .switchMap((test) => Observable.fromPromise(isOnline()))
      .distinctUntilChanged();
  }
}

