import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Downgrade } from '../../hybrid/downgrade';

@Downgrade()
@Injectable()
export class ImageService {

  constructor(private db: AngularFireDatabase) {
  }

  getCombinedUrlProperty(obj1, obj2): Observable<string[]> {
    return Observable.combineLatest(
      this.getUrlProperty(obj1.ref, obj1.property),
      this.getUrlProperty(obj2.ref, obj2.property));
  }

  setUrlProperty(ref, property, url) {
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

  removeUrlProperty(ref, property) {
    return this.db.object(`${ref}/${property}`).remove();
  }

}
