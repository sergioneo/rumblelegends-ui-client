const ngtools = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const compression = require('compression-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const checker = require('awesome-typescript-loader').CheckerPlugin;
const replacement = require('webpack/lib/ContextReplacementPlugin');
const dll = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const assethtml = require('add-asset-html-webpack-plugin');
const chunk = require('webpack/lib/optimize/CommonsChunkPlugin');
const portfinder = require('portfinder');
const autoprefixer = require('autoprefixer');
const rxPaths = require('rxjs/_esm2015/path-mapping');
const webpackProyect = require('./webpack.proyect.js');
const ROOT = path.resolve(__dirname, '..');

// Busqueda de archivos de configuracion de constantes
const _ = require('lodash');
const find = require('find');

let config = {
	context: ROOT,
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		alias: (() => {
			let alias = {};

			_.forIn(
				rxPaths(path.resolve('node_modules'), (value, key) => {
					_.set(alias, key, vaue);
				})
			);

			const enviroment = _.isUndefined(process.env.ENVIROMENT) ? 'dev' : process.env.ENVIROMENT;

			find.fileSync(`constants.${enviroment}.ts`, path.join(path.resolve('src'), 'app', 'modules')).map((file) => {
				_.set(alias, `@${_.toLower(path.basename(path.resolve(file, '../../')))}/constants`, file);
			});

			return alias;
		})(),
	},
	entry: {
		polyfills: './src/polyfills.ts',
		main: './src/main.ts',
	},
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].bundle.map',
		chunkFilename: '[id].chunk.js',
		library: 'ac_[name]',
		libraryTarget: 'var',
	},
	devtool: 'cheap-module-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'Rumble Legends',
			inject: 'body',
			xhtml: true,
			isDevLocal: true,
			baseRef: `/`,
		}),

		new extract({
			filename: './[name].css',
			allChunks: true,
			disable: false,
		}),

		new copy([
			{
				context: './public',
				from: '**/*',
			},
		]),

		new copy(
			(() => {
				let assets = [];

				find.dirSync(`assets`, path.join(path.resolve('src'), 'app', 'modules')).map((dir) => {
					const splitPath = dir.split(path.sep);
					assets.push({
						from: dir,
						to: `${_.toLower(splitPath[splitPath.length - 2])}/assets`,
					});
				});

				return assets;
			})()
		),

		new checker({
			exclude: ['main.aot.ts'],
		}),

		new replacement(/angular(\\|\/)core(\\|\/)src(\\|\/)linker/, path.resolve(__dirname, '../src')),

		new dll({
			bundles: {
				polyfills: [
					'core-js',
					{
						name: 'zone.js',
						path: 'zone.js/dist/zone.js',
					},
					{
						name: 'zone.js',
						path: 'zone.js/dist/long-stack-trace-zone.js',
					},
				],
				vendor: [
					'@angular/platform-browser',
					'@angular/platform-browser-dynamic',
					'@angular/core',
					'@angular/common',
					'@angular/forms',
					'@angular/http',
					'@angular/router',
					'rxjs',
				],
			},
			dllDir: path.resolve(__dirname, '../dist'),
			webpackConfig: {
				devtool: 'cheap-module-source-map',
				plugins: [],
			},
		}),

		new webpack.HotModuleReplacementPlugin(),

		new assethtml([
			{
				filepath: path.resolve(__dirname, `../dist/${dll.resolveFile('polyfills')}`),
			},
			{
				filepath: path.resolve(__dirname, `../dist/${dll.resolveFile('vendor')}`),
			},
		]),
		new chunk({
			name: 'polyfills',
			chunks: ['polyfills'],
		}),

		new chunk({
			name: 'vendor',
			chunks: ['main'],
			minChunks: (module) => /node_modules/.test(module.resource),
		}),

		new chunk({
			name: ['polyfills', 'vendor'].reverse(),
		}),

		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer],
			},
		}),

		new compression({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$/,
			threshold: 10240,
			minRatio: 0.8,
		}),

		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: '@angularclass/hmr-loader',
					},
					{
						loader: 'ng-router-loader',
						options: {
							loader: 'async-import',
							genDir: './src/ngfactory',
							aot: false,
						},
					},
					{
						loader: 'awesome-typescript-loader',
					},
					{
						loader: 'angular2-template-loader',
					},
				],
				exclude: [/\.aot\.ts$/],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
				exclude: [path.resolve(__dirname, '../src/app')],
			},
			{
				test: /\.css$/,
				use: ['to-string-loader', 'css-loader', 'postcss-loader'],
				include: [path.resolve(__dirname, '../src/styles')],
			},
			{
				test: /\.scss$/,
				loader: ['to-string-loader'].concat(
					extract.extract({
						use: [
							{
								loader: 'css-loader',
								options: {
									sourceMap: true,
								},
							},
							{
								loader: 'postcss-loader',
								options: {
									sourceMap: true,
									ident: 'postcss',
									plugins: [
										require('postcss-smart-import')(),
										require('postcss-cssnext')({
											features: {
												autoprefixer: {
													grid: false,
													flexbox: true,
												},
											},
										}),
										require('postcss-apply')(),
										require('postcss-responsive-type')(),
									],
								},
							},
							{
								loader: 'resolve-url-loader',
							},
							{
								loader: 'sass-loader',
								options: {
									sourceMap: true,
									data: '@import "variables";',
									includePaths: [path.resolve(__dirname, '../src/app')],
								},
							},
						],
						fallback: 'style-loader',
					})
				),
			},
			{
				test: /\.html$/,
				loader: 'raw-loader',
				exclude: [path.join(ROOT, 'src/index.html')],
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.(jp?g|png|gif)$/,
				loader: 'file-loader',
				options: {
					hash: 'sha512',
					digest: 'hex',
					name: '[hash].[ext]',
				},
			},
			{
				test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/,
				loader: 'file-loader',
				options: {
					hash: 'sha512',
					digest: 'hex',
					name: '[hash].[ext]',
				},
			},
		],
	},
	devServer: {
		historyApiFallback: true,
		open: true,
		hot: true,
		inline: true,
		proxy: {
			'/marketplace/**': {
				target: {
					host: 'beast-service-beta.herokuapp.com',
					protocol: 'https:',
					port: 443,
				},
				changeOrigin: true,
				secure: false,
				logLevel: 'info',
			},
		},
		stats: {
			colors: true,
			chunks: false,
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
		},
	},
};

module.exports = () => {
	return portfinder.getPortPromise().then((port) => {
		config.devServer.port = port;
		return config;
	});
};
