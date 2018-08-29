const ngtools = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copy = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const compression = require('compression-webpack-plugin');
const extract = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const rxPaths = require('rxjs/_esm2015/path-mapping');
const webpackProyect = require('./webpack.proyect.js');
// Busqueda de archivos de configuracion de constantes
const _ = require('lodash');
const find = require('find');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
	context: ROOT,
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		alias: (() => {
			const enviroment = 'prod';
			let alias = {};

			_.forIn(
				rxPaths(path.resolve('node_modules'), (value, key) => {
					_.set(alias, key, vaue);
				})
			);

			find.fileSync(`constants.${enviroment}.ts`, path.join(path.resolve('src'), 'app', 'modules')).map((file) => {
				_.set(alias, `@${_.toLower(path.basename(path.resolve(file, '../../')))}/constants`, file);
			});

			return alias;
		})(),
	},
	entry: {
		app: './src/main.aot.ts',
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[chunkhash].bundle.js',
		sourceMapFilename: 'js/[name].[chunkhash].bundle.map',
		chunkFilename: 'js/[id].[chunkhash].chunk.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'Rumble Legends',
			inject: 'body',
			xhtml: true,
			isDevLocal: false,
			baseRef: `${webpackProyect.pathProyect}`,
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

		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				screw_ie8: true,
			},
			compress: {
				screw_ie8: true,
				warnings: false,
			},
		}),

		new compression({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.html$/,
			threshold: 10240,
			minRatio: 0.8,
		}),

		new extract('[name].[contenthash].css'),

		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [autoprefixer],
			},
		}),

		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extract.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader'],
				}),
				include: [path.resolve(__dirname, '../src/styles')],
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
						publicPath: './',
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
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'file-loader',
				options: {
					hash: 'sha512',
					digest: 'hex',
					name: '[name].[hash].[ext]',
				},
			},
			{
				test: /\.(eot|woff2?|svg|ttf|otf)([\?]?.*)$/,
				loader: 'file-loader',
				options: {
					hash: 'sha512',
					digest: 'hex',
					name: '[name].[hash].[ext]',
				},
			},
		],
	},
};
