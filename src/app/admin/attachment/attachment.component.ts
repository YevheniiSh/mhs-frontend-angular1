import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UploadService } from '../../services/upload-service/upload.service';
import { NotificationService } from '../../services/notification-service/notification.service';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import { ImageService } from '../../services/image-service/image.service';
import { Downgrade } from '../../hybrid/downgrade';

@Downgrade()
@Component({
  selector: 'mhs-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  file;
  fileUrl;
  user: Observable<firebase.User>;
  @Input() resource;
  @Input() urlProperty;
  @Input() fileType;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private uploadService: UploadService,
              private imageService: ImageService,
              private afAuth: AngularFireAuth,
              private notifications: NotificationService) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
    this.getFileUrl();
  }

  setFile(event) {
    const fileType = event.target.files[0].type;
    if (-1 !== fileType.search(this.fileType)) {
      this.file = event.target.files[0];
      this.uploadFile();
    } else {
      this.notifications.showError('FILE_TYPE_ERR');
    }
  }

  chooseFile() {
    this.inputFile.nativeElement.value = '';
    this.inputFile.nativeElement.click();
  }


  uploadFile() {
    this.uploadService.uploadFile(this.file)
      .then((url) => {
        this.imageService.setUrlProperty(this.resource, this.urlProperty, url);
        this.notifications.showSuccess('FILE_SUCCESS_SAVED');
        // this.saved.emit(url);
      });
  }

  getFileUrl() {
    this.imageService.getUrlProperty(this.resource, this.urlProperty)
      .subscribe((res) => {
        this.fileUrl = res;
      });
  }

  removeFileUrl() {
    this.imageService.removeUrlProperty(this.resource, this.urlProperty);
  }

}
