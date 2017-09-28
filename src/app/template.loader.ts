import * as angular from 'angular';

export function upgradeDirective(moduleName, invokedName) {
  angular.module(moduleName).config(config);

  function config($provide) {
    $provide.decorator(invokedName + 'Directive', decorator);
  }

  function decorator($delegate) {
    const directive = $delegate[0];

    if (directive.hasOwnProperty('compile')) {
      delete directive.compile;
    }

    // if (directive.hasOwnProperty('replace')) {
    //   delete directive.replace;
    // }

    return $delegate;
  }
}
