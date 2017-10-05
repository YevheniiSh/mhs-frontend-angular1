'use strict';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

angular
  .module('firebaseDataService')
  .factory('firebaseOfflineService',firebaseOfflineService);

function firebaseOfflineService() {

  initData();

  return {
    enableOffline: enableOffline
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

  function initData(){
    let ref = firebase.database().ref();
    ref.child('games/current/').on('value', () => {});
    ref.child('games/open/').on('value', () => {});
    ref.child('teams/').on('value', () => {});
    ref.child('seasons/').on('value', () => {});
    ref.child('gameTemplates/').on('value', () => {});
    ref.child('roundTypes/').on('value', () => {});
    ref.child('teamsRequests/').on('value', () => {});
  }
}

