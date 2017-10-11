import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UploadService } from '../../services/upload-service/upload.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { NotificationService } from '../../services/notification-service/notification.service';

@Component({
  selector: 'mhs-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  file;
  @Input() saveRef;
  @ViewChild('inputFile') inputFile: ElementRef;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  user: Observable<firebase.User>;

  constructor(private uploadService: UploadService,
              private afAuth: AngularFireAuth,
              private notifications: NotificationService) {
    this.user = afAuth.authState;
  }

  ngOnInit() {
  }

  setFile(event) {
    const fileType = event.target.files[0].type;

    if (-1 !== fileType.search('image/')) {
      this.file = event.target.files[0];
      this.uploadFile();
    } else {
      this.notifications.showError('FILE_TYPE_ERR');
    }
  }

  chooseFile() {
    this.inputFile.nativeElement.click();
  }

  uploadFile() {
    this.uploadService.uploadFile(this.file, this.saveRef)
      .then((res) => {
        this.saved.emit(res);
        this.notifications.showSuccess('FILE_SUCCESS_SAVED');
      });
  }
}
