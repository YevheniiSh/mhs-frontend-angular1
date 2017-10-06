import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadService } from '../../services/upload-service/upload.service';

@Component({
  selector: 'mhs-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  inputFile;
  @Input() saveRef;
  @Output() saved: EventEmitter<any> = new EventEmitter();

  constructor(private  uploadService: UploadService) {
  }

  ngOnInit() {
  }

  setFile(event) {
    this.inputFile = event.target;
  }

  uploadFile() {
    this.uploadService.uploadFile(this.inputFile.files[0], this.saveRef).then((res) => {
      this.saved.emit(res);
    });
  }
}
