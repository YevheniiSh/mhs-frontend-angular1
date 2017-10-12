import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class ImageService {

  constructor(private db: AngularFireDatabase) {
  }

  // setImgUrlToSeason(imgUrl, seasonId) {
  //   this.db.object(`/seasons/${seasonId}`).update({ imgUrl });
  // }
  //
  // setImgUrlToRegistration(imgUrl, gameId) {
  //   this.db.object(`/games/open/${gameId}`).update({ imgUrl });
  // }
  //
  // setImgUrlToFinishedGame(imgUrl, gameId) {
  //   this.db.object(`/games/finished/${gameId}`).update({ imgUrl });
  // }
  //
  // getImgUrlFromSeason(seasonId): Observable<string> {
  //   const url = new Observable((obs) => {
  //     this.db.object(`/seasons/${seasonId}/imgUrl`)
  //       .subscribe((res) => {
  //         obs.next(res.$value);
  //       });
  //   });
  //   return url;
  // }
  //
  // getRegistrationImg(gameId): Observable<string> {
  //   const url = new Observable((obs) => {
  //     this.db.object(`/games/open/${gameId}/imgUrl`)
  //       .subscribe((res) => {
  //         obs.next(res.$value);
  //       });
  //   });
  //   return url;
  // }
  //
  // getImgUrlFromFinishedGame(gameId): Observable<string> {
  //   const url = new Observable((obs) => {
  //     this.db.object(`/games/finished/${gameId}/imgUrl`)
  //       .subscribe((res) => {
  //         obs.next(res.$value);
  //       });
  //   });
  //   return url;
  // }
  //
  getCombinedUrlProperty(ref, property, ref2, property2): Observable<string[]> {
    return Observable.combineLatest(
      this.getUrlProperty(ref, property),
      this.getUrlProperty(ref2, property2));
  }

  setUrlProperty(ref, property, url): firebase.Promise<void> {
    return this.db.object(`${ref}/${property}`).set(url);
  }

  getUrlProperty(ref, property): Observable<any> {
    return new Observable((obs) => {
      this.db.object(`${ref}/${property}`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
  }

  removeUrlProperty(ref, property): firebase.Promise<void> {
    return this.db.object(`${ref}/${property}`).remove();
  }

}
