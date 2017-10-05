import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackupService } from '../../services/backup/backup.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mhs-download-backup',
  templateUrl: './download-backup.component.html',
  styleUrls: ['./download-backup.component.css']
})
export class DownloadBackupComponent implements OnInit {

  @ViewChild('link') link: ElementRef;
  url;
  fileName;

  constructor(private backupService: BackupService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  getBackup() {
    this.backupService.getBackupBlob()
      .subscribe((res) => {
        this.initFile(res);
        this.downloadFile();
      });
  }

  private initFile(json) {
    const blob = new Blob([JSON.stringify(json)], { type: 'text/json' });
    const objUrl = window.URL.createObjectURL(blob);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(objUrl);
    this.fileName = new Date() + 'backup.json';
  }

  private downloadFile() {
    setTimeout(() => {
      this.link.nativeElement.click();
    });
  }
}
