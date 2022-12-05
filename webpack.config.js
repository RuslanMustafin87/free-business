const path = require('path');
const webpack = require('webpack');
const TerserJS = require('./webpack/terserJS');
const babel = require('./webpack/babel');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pug = require('./webpack/pug');
const css = require('./webpack/css');
const image = require('./webpack/image');
const font = require('./webpack/font');
const devtool = require('./webpack/devtool');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
	source: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist'),
};

const common = merge([
	{
		entry: {
			index: PATHS.source + '/index.js',
		},
		output: {
			path: PATHS.build,
			filename: 'js/[name].js',
			clean: true,
			assetModuleFilename: 'assets/[name][ext]',
		},
		optimization: {
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					default: false,
					commons: {
						test: /\.(js|css|scss)$/,
						chunks: 'all',
						minChunks: 2,
						name: 'common',
						enforce: true,
					},
				},
			},
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index', 'common'],
				template: PATHS.source + '/index.pug',
				// favicon: PATHS.source + '/images/icons/brand.svg'
			}),
			new FriendlyErrorsWebpackPlugin(),
			// new RuntimeAnalyzerPlugin()
			new FaviconsWebpackPlugin({
				logo: PATHS.source + '/images/icons/brand.svg',
				// publicPath: '',
				// outputPath: '/assets/favicons/',
				prefix: '/assets/favicons/',
				favicons: {
					appName: 'Local business',
					start_url: '/',
					display: 'standalone',
					orientation: 'any',
					background: '#fff',
					theme_color: '#719dca',
					icons: {
						android: [
							'android-chrome-16x16.png',
							'android-chrome-32x32.png',
							'android-chrome-192x192.png',
							'android-chrome-512x512.png',
						],
						favicons: ['favicon-16x16.png', 'favicon-32x32.png'],
						appleIcon: [
							'apple-touch-icon-180x180.png',
							'apple-touch-icon-precomposed.png',
							'apple-touch-icon.png',
						],
						appleStartup: false,
						windows: false,
						yandex: false,
					},
				},
			}),
			new CopyPlugin({
				patterns: [
					{
						from: PATHS.source + '/images/favicons/',
						to: PATHS.build + '/assets/',
					},
				],
			}),
		],
	},
	babel(),
	pug(),
	image(),
	font(),
]);

module.exports = function (env, argv) {
	if (argv.mode === 'production') {
		return merge([
			{
				output: {
					publicPath: '/assets/',
				},
			},
			TerserJS(),
			css(argv.mode),
			common,
		]);
	}
	if (argv.mode === 'development') {
		return merge([
			css(argv.mode),
			{
				devServer: {
					// static: './dist',
					historyApiFallback: true,
					compress: true,
					port: 3010,
					hot: true,
					watchFiles: {
						paths: ['src/**/*.*'],
						options: {
							usePolling: true,
						},
					},
				},
				plugins: [new webpack.HotModuleReplacementPlugin()],
			},
			devtool(),
			common,
		]);
	}
};
