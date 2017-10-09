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

  setImgUrlToOpenGame(imgUrl, gameId) {
    this.db.object(`/games/open/${gameId}`).update({ imgUrl });
  }

  getImgUrlFromSeason(seasonId): Observable<string> {
    let url = new Observable((obs) => {
      this.db.object(`/seasons/${seasonId}/imgUrl`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
    return url;
  }

  getImgUrlFromOpenGame(seasonId) {
    return this.db.object(`/games/open/${seasonId}/imgUrl`)
      .subscribe((res) => {
        return res.$value;
      });
  }

  getImgUrlFroGame(seasonId): Observable<string> {
    let url = new Observable((obs) => {
      this.db.object(`/seasons/${seasonId}/imgUrl`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
    return url;
  }

}
