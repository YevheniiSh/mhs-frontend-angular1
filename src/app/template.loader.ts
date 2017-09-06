import * as angular from 'angular';

export function upgradeDirective(moduleName, invokedName) {
  angular.module(moduleName).config(config);

  function config($provide) {
    $provide.decorator(invokedName + 'Directive', decorator);
  }

  function decorator($delegate) {
    let directive = $delegate[0];

    if (directive.hasOwnProperty('replace')) {
      delete directive.replace;
    }

    if (directive.hasOwnProperty('templateUrl')) {
      let key = directive.templateUrl.substring(directive.templateUrl.indexOf('app/'));

      delete directive.templateUrl;
//todo add css key parser and add css in template
      directive.template = readTextFile(key);
    }

    return $delegate;
  }
}

function readTextFile(file) {
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.send(null);
  return rawFile.responseText;
}
