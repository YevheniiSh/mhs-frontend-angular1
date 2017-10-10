const gulp = require('gulp');
const ngHtml2Js = require('gulp-ng-html2js');
const minifyHtml = require('gulp-minify-html');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const singleModuleTemplateWithCss = "(function(module) {\n" +
  "try {\n" +
  "  module = angular.module('<%= moduleName %>');\n" +
  "} catch (e) {\n" +
  "  module = angular.module('<%= moduleName %>', []);\n" +
  "}\n" +
  "module.run(['$templateCache', function($templateCache) {\n" +
  "  $templateCache.put('<%= template.url %>',\n    '<link href=\"<%= template.url.replace(/.html/gi, '.css') %>\" rel=\"stylesheet\"><%= template.prettyEscapedContent %>');\n" +
  "}]);\n" +
  "})();\n";

function minifyPipe() {
  return minifyHtml({
    empty: true,
    spare: true,
    quotes: true
  });
}

function ngHtml2JsPipe(templatePathPrefix) {
  return ngHtml2Js({
    prefix: templatePathPrefix,
    moduleName: 'mhs',
    template: singleModuleTemplateWithCss
  });
}

function cacheTemplates(src, templatePathPrefix, outName, outDir = './tmp') {
  return gulp.src(src)
    .pipe(minifyPipe())
    .pipe(ngHtml2JsPipe(templatePathPrefix))
    .pipe(concat(outName + '.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outDir));
}

gulp.task('cache-admin-templates', function () {
  cacheTemplates('src/app/admin/**/*.html', 'app/admin/', 'admin-template-cache')
});

gulp.task('cache-player-templates', function () {
  cacheTemplates('src/app/player/**/*.html', 'app/player/', 'player-template-cache')
});

gulp.task('default', ['cache-admin-templates', 'cache-player-templates']);
