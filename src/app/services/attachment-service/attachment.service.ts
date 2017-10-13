import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Downgrade } from '../../hybrid/downgrade';


@Downgrade()
@Injectable()
export class AttachmentService {
  private storage: any;
  private ref = 'upload-files/';

  constructor(private db: AngularFireDatabase) {
    this.storage = firebase.storage();
  }

  attachFile(file, dbResource, property): Promise<any> {
    return this.storage.ref(this.createRef(file)).put(file)
      .then((res) => {
        return this.db.object(`${dbResource}/${property}`).set(res.metadata.downloadURLs[0]);
      });
  }

  private createRef(file) {
    const date = new Date;
    return this.ref + date.toString().replace(/ /g, '_') + file.name;
  }

  getProperty(ref, property): Observable<any> {
    return new Observable((obs) => {
      this.db.object(`${ref}/${property}`)
        .subscribe((res) => {
          obs.next(res.$value);
        });
    });
  }

  getCombinedProperty(obj1, obj2): Observable<string[]> {
    return Observable.combineLatest(
      this.getProperty(obj1.ref, obj1.property),
      this.getProperty(obj2.ref, obj2.property));
  }

  removeProperty(ref, property) {
    return this.db.object(`${ref}/${property}`).remove();
  }

}

