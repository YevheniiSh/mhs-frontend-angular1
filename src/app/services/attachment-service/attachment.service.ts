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
        return this.setFileUrl(dbResource, property, res.metadata.downloadURLs[0]);
      });
  }

  private setFileUrl(dbResource, property, url) {
    return this.db.object(`${dbResource}/${property}`).set(url);
  }

  private createRef(file) {
    const date = new Date;
    return this.ref + date.toString().replace(/ /g, '_') + file.name;
  }

  getFileUrl(ref, property): Observable<any> {
    return this.db.object(`${ref}/${property}`)
      .map(res => res.$value);
  }

  removeFile(ref, property) {
    return this.db.object(`${ref}/${property}`).remove();
  }

}

