import { Inject, Injectable } from '@angular/core';

@Injectable()
export class TranslateService {

  constructor(@Inject('$translate') private translateService) {
  }

  public translateMessage(message): Promise<string> {
    return this.translateService(message);
  }

  public translateMessages(messages: string[]): Promise<object> {
    return this.translateService(messages);
  }
}
