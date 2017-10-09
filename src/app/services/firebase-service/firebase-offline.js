'use strict';

angular
  .module('firebaseDataService')
  .factory('firebaseOfflineService',firebaseOfflineService);

function firebaseOfflineService() {

  return {
    initData: initData
  };

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

