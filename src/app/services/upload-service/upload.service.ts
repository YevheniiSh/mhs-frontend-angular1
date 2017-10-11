import { Injectable } from '@angular/core';

declare let firebase: any;

@Injectable()
export class UploadService {
  private storage: any;

  constructor() {
    this.storage = firebase.storage();
  }

  uploadFile(file, ref): Promise<any> {
    return this.storage.ref(this.createRef(ref, file)).put(file)
      .then((res) => {
        return res.metadata.downloadURLs[0];
      });
  }

  private createRef(ref, file) {
    console.log(ref)
    let date =  new Date;
    return ref + date.toString().replace(/ /g, '_') + file.name;
  }

}

