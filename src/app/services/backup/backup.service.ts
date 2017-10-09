import { Injectable } from '@angular/core';
import { Downgrade } from '../../hybrid/downgrade';

@Injectable()
@Downgrade('mhs.admin')
export class BackupService {

  constructor() {
  }

}
