import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { UpgradeModule } from "@angular/upgrade/static";

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(HybridAppModule);

// platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
//   (<any>ref.instance).upgrade.bootstrap(document.body, ['mhs']);
// });


const eagerlyLoadedNg2ProvidersWithNg1Dependencies = ['TeamServiceFactory'];

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['mhs']);


  console.log(upgrade.$injector.get('TeamServiceFactory'));

  // setTimeout(() => {
  //   eagerlyLoadedNg2ProvidersWithNg1Dependencies.forEach((provider) => {
  //     platformRef.injector.get(provider);
  //   });
  // });
});
