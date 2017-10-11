import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService {

  constructor(private db: AngularFireDatabase) {
  }

  setImgUrlToSeason(imgUrl, seasonId) {
    this.db.object(`/seasons/${seasonId}`).update({ imgUrl });
  }

  setImgUrlToRegistration(imgUrl, gameId) {
    this.db.object(`/games/open/${gameId}`).update({ imgUrl });
  }

  setImgUrlToFinishedGame(imgUrl, gameId) {
    this.db.object(`/games/finished/${gameId}`).update({ imgUrl });
  }

  getImgUrlFromSeason(seasonId): Observable<string> {
    const url = new Observable((obs) => {
      this.db.object(`/seasons/${seasonId}/imgUrl`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
    return url;
  }

  getImgUrlFromOpenGame(gameId): Observable<string> {
    const url = new Observable((obs) => {
      this.db.object(`/games/open/${gameId}/imgUrl`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
    return url;
  }

  getImgUrlFromFinishedGame(gameId): Observable<string> {
    const url = new Observable((obs) => {
      this.db.object(`/games/finished/${gameId}/imgUrl`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
    return url;
  }

  getImgUrlFromSeasonAndGame(gameId, seasonId): Observable<string[]> {
    return Observable.combineLatest(
      this.getImgUrlFromFinishedGame(gameId),
      this.getImgUrlFromSeason(seasonId)
    );
  }
}
