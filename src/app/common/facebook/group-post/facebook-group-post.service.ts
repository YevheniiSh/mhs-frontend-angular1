import { TranslateService } from '../../../services/translate-service/translate.service.upgrade';
import { PromptComponent } from '../../modal-prompt/prompt.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class FacebookGroupPostService {

  private title = '';
  private description = '';

  constructor(private translateService: TranslateService, private dialogService: DialogService) {
    this.initTranslations();
  }

  private initTranslations() {
    const promptTitle = 'FACEBOOK_GROUP_POST_PROMPT_TITLE';
    const promptDescription = 'FACEBOOK_GROUP_POST_PROMPT_DESCRIPTION';

    this.translateService
      .translateMessages([promptTitle, promptDescription])
      .then((translations) => {
        this.title = translations[promptTitle];
        this.description = translations[promptDescription];
      });
  }

  getPostPrompt(): Observable<string> {
    return this.dialogService.addDialog(PromptComponent, {
      title: this.title,
      question: this.description
    });
  }
}
