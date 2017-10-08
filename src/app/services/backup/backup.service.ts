import { Injectable } from '@angular/core';
import { Downgrade } from '../../hybrid/downgrade-component';

@Injectable()
@Downgrade()
export class BackupService {

  constructor() {
  }

}
