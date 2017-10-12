import { environment } from '../environments/environment';

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

    if (!environment.production) {
      if (directive.hasOwnProperty('templateUrl')) {
        const directiveTemplateUrl = directive.templateUrl.substring(directive.templateUrl.indexOf('app/'));

        delete directive.templateUrl;

        directive.template = readTextFile(directiveTemplateUrl);
      }

      if (directive.hasOwnProperty('css')) {
        const cssUrl = directive.css.substring(directive.css.indexOf('app/'));
        directive.template = directive.template.replace(/^/, '<link href="' + cssUrl + '" rel="stylesheet">');
      }
    }

    return $delegate;
  }
}

function readTextFile(file) {
  const rawFile = new XMLHttpRequest();
  rawFile.open('GET', file, false);
  rawFile.send(null);
  return rawFile.responseText;
}
