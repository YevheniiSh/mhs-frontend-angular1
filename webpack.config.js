const fs = require('fs');
const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const {NoEmitOnErrorsPlugin, NamedModulesPlugin} = require('webpack');
const {InsertConcatAssetsWebpackPlugin, NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin} = require('@angular/cli/plugins/webpack');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {AotPlugin} = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "main"];
const minimizeCss = false;

const externalStyles = [
  "./node_modules/ng2-toastr/bundles/ng2-toastr.min.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css",
  "./bower_components/components-font-awesome/css/font-awesome.min.css",
  "./src/styles.css",
  "./src/app/public/css/spinner.css",
  "./bower_components/html5-boilerplate/dist/css/normalize.css",
  "./bower_components/html5-boilerplate/dist/css/main.css",
  "./src/app/app.css",
  "./src/app/public/css/bootstrapSilverButton.css",
  "./bower_components/angucomplete-alt/angucomplete-alt.css",
];

const environmentFiles = {
  'development': 'environments/environment.ts',
  'production': 'environments/environment.prod.ts'
};

const postcssPlugins = function () {
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: {remove: (comment) => !importantCommentRe.test(comment)}
  };
  return [
    postcssUrl({
      url: (URL) => {
        if (!URL.startsWith('/') || URL.startsWith('//')) {
          return URL;
        }
      }
    }),
    autoprefixer(),
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};

module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules"
    ],
    "symlinks": true
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ],
    "styles": externalStyles
  },
  "output": {
    "filename": "[name].[chunkhash].bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  "module": {
    "rules": [
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": externalStyles.map(externalStyle => path.join(process.cwd(), externalStyle)),
        "test": /\.css$/,
        "use": [
          "exports-loader?module.exports.toString()",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "include": externalStyles.map(externalStyle => path.join(process.cwd(), externalStyle)),
        "test": /\.css$/,
        "use": [
          "style-loader",
          {
            "loader": "css-loader",
            "options": {
              "sourceMap": false,
              "importLoaders": 1
            }
          },
          {
            "loader": "postcss-loader",
            "options": {
              "ident": "postcss",
              "plugins": postcssPlugins
            }
          }
        ]
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new UglifyJSPlugin({
      exclude: /main\.\w+.*/,
      sourceMap: false,
      ecma: 5,
      output: {
        comments: false
      }
    }),
    new NoEmitOnErrorsPlugin(),
    new ConcatPlugin({
      "uglify": false,
      "sourceMap": false,
      "name": "scripts",
      "fileName": "[name].[hash].bundle.js",
      "filesToConcat": [
        "node_modules/systemjs/dist/system.js",
        "node_modules/firebase/firebase.js",
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-translate/angular-translate.js",
        "./bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
        "./bower_components/angular-bootstrap/ui-bootstrap.min.js",
        "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "./bower_components/angular-animate/angular-animate.min.js",
        "./bower_components/ngMask/dist/ngMask.min.js",
        "./bower_components/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js",
        "./bower_components/angular-dynamic-locale/dist/tmhDynamicLocale.min.js",
        "./bower_components/angularfire/dist/angularfire.min.js",
        "./bower_components/angular-route/angular-route.min.js",
        "./bower_components/angular-css/angular-css.min.js",
        "./bower_components/angucomplete-alt/dist/angucomplete-alt.min.js",
        "node_modules/ng2-toastr/bundles/ng2-toastr.min.js"
      ]
    }),
    new InsertConcatAssetsWebpackPlugin([
      "scripts"
    ]),
    new CopyWebpackPlugin([
      {
        "context": "src/",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src/",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      },
      {
        "context": "src/app/",
        "to": "./app/",
        "from": {
          "glob": "**/*.css",
          "dot": true
        }
      },
      {
        "context": "src/app/",
        "to": "./app/",
        "from": {
          "glob": "**/translations/*",
          "dot": true
        }
      },
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        }
        else if (leftIndex < rightindex) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
        return module.resource
          && (module.resource.startsWith(nodeModules)
            || module.resource.startsWith(genDirNodeModules)
            || module.resource.startsWith(realNodeModules));
      },
      "chunks": [
        "main"
      ]
    }),

    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new AotPlugin({
      "mainPath": "main.ts",
      "replaceExport": false,
      "hostReplacementPaths": {
        "./environments/environment": environmentFiles['production']
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
    })
  ],
};
