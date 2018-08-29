const path = require('path');
const root = path.resolve(__dirname, '..');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const rxPaths = require('rxjs/_esm2015/path-mapping');

// Busqueda de archivos de configuracion de constantes
const _ = require('lodash');
const find = require('find');

module.exports = function (options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules'],
      alias: (() => {
        let alias = {};

        _.forIn(
          rxPaths(path.resolve('node_modules'), (value, key) => {
            _.set(alias, key, vaue);
          })
        );

        const enviroment = _.isUndefined(process.env.ENVIROMENT) ? 'dev' : process.env.ENVIROMENT;

        find.fileSync(`constants.${enviroment}.ts`, path.join(path.resolve('src'), 'app', 'modules')).map((file) => {
          const NAME_MODULE = path.basename(path.resolve(file, '../../'));
          const REAL_NAME_MODULE = _.toLower(NAME_MODULE);

          _.set(alias, `@${REAL_NAME_MODULE}/constants`, file);
        });

        return alias;
      })(),
    },
    module: {
      rules: [{
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [path.join(root, 'node_modules')],
        },
        {
          test: /\.ts$/,
          use: [{
              loader: 'awesome-typescript-loader',
              options: {
                module: 'commonjs'
              }
            },
            {
              loader: 'angular2-template-loader'
            },
          ],
          exclude: [/\.aot\.ts$/],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [path.join(root, 'src/index.html')]
        },
        {
          test: /\.css$/,
          loader: ['to-string-loader', 'css-loader'],
          exclude: [path.join(root, 'src/index.html')]
        },
        {
          test: /\.scss$|\.sass$/,
          loader: ['raw-loader', 'sass-loader'],
          exclude: [path.join(root, 'src/index.html')],
        },
        {
          test: /\.scss$|\.sass$/,
          use: [{
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "variables";',
              includePaths: [path.resolve(__dirname, '../src/app')],
            }
          }]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [path.join(root, 'src/index.html')]
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: path.join(root, 'src'),
          exclude: [/\.(e2e|spec)\.ts$/, /node_modules/],
        },
      ],
    },
    plugins: [
      new ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)esm5/, path.resolve(__dirname, '../src')),
      new LoaderOptionsPlugin({
        debug: false,
        options: {}
      }),
    ],
    performance: {
      hints: false
    },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    },
  };
};
