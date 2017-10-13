import { Injectable } from '@angular/core';
import { Downgrade } from '../../hybrid/downgrade';


@Downgrade()
@Injectable()
export class UploadService {
  private storage: any;
  private ref = 'upload-files/';
  constructor() {
    this.storage = firebase.storage();
  }

  uploadFile(file): Promise<any> {
    return this.storage.ref(this.createRef(file)).put(file)
      .then((res) => {
        return res.metadata.downloadURLs[0];
      });
  }

  private createRef(file) {
    const date = new Date;
    return this.ref + date.toString().replace(/ /g, '_') + file.name;
  }

}

