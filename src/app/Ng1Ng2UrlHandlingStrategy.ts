import { UrlHandlingStrategy } from '@angular/router';

export class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) {
    return url.toString().startsWith('/settings');
  }

  extract(url) {
    return url;
  }

  merge(url, whole) {
    return url;
  }
}
