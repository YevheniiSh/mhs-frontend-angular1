import { UrlHandlingStrategy, UrlTree } from '@angular/router';

export class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree) {
    return url.toString() === '/' || url.toString() === '/phones';
  }

  extract(url: UrlTree) {
    return url;
  }

  merge(url: UrlTree, whole: UrlTree) {
    return url;
  }
}
