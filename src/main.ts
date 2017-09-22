import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { HybridAppModule } from './app/hybridApp.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(HybridAppModule);
