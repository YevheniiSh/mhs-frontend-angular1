import * as angular from 'angular';

export function upgradeDirective(moduleName, invokedName) {
  angular.module(moduleName).config(config);

  function config($provide) {
    $provide.decorator(invokedName + 'Directive', decorator);
  }

  function decorator($delegate) {
    let directive = $delegate[0];

    if (directive.hasOwnProperty('compile')) {
      delete directive.compile;
    }

    if (directive.hasOwnProperty('replace')) {
      delete directive.replace;
    }

    if (directive.hasOwnProperty('templateUrl')) {
      let directiveTemplateUrl = directive.templateUrl.substring(directive.templateUrl.indexOf('app/'));

      delete directive.templateUrl;

      directive.template = readTextFile(directiveTemplateUrl);
    }

    if (directive.hasOwnProperty('css')) {
      let cssUrl = directive.css.substring(directive.css.indexOf('app/'));
      directive.template = directive.template.replace(/^/, '<link href="' + cssUrl + '" rel="stylesheet">');
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
