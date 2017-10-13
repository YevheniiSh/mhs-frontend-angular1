import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification-service/notification.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AttachmentService } from '../../services/attachment-service/attachment.service';
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
  user;
  @Input() resource;
  @Input() urlProperty;
  @Input() fileType;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private attachmentService: AttachmentService,
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
    this.attachmentService.attachFile(this.file, this.resource, this.urlProperty)
      .then((url) => {
        this.notifications.showSuccess('FILE_SUCCESS_SAVED');
      });
  }

  getFileUrl() {
    this.attachmentService.getProperty(this.resource, this.urlProperty)
      .subscribe((res) => {
        this.fileUrl = res;
      });
  }

  removeFileUrl() {
    this.attachmentService.removeProperty(this.resource, this.urlProperty);
  }

}
