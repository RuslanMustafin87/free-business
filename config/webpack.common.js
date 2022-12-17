const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const PATHS = {
	source: path.resolve(__dirname, "..", "src"),
	build: path.resolve(__dirname, "..", "dist"),
};

module.exports = {
	entry: {
		index: PATHS.source + "/index.js",
	},
	output: {
		path: PATHS.build,
		filename: "js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|dist)/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.pug$/,
				loader: "pug-loader",
				options: {
					pretty: false,
				},
			},
			{
				test: /\.(jpe?g|png|webp)$/,
				type: "asset/resource",
				generator: { filename: "images/[name].[contenthash:8][ext]" },
			},
			{
				test: /\.svg$/,
				type: "asset/resource",
				generator: { filename: "images/icons/[name].[contenthash:8][ext]" },
				use: [{ loader: "svgo-loader", options: { plugins: [{ name: "cleanupIDs", active: false }] } }],
			},
			{
				test: /\.woff2|woff|ttf$/,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name].[contenthash:8][ext]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			chunks: ["index", "common"],
			template: PATHS.source + "/index.pug",
		}),
		new FriendlyErrorsWebpackPlugin(),
		new FaviconsWebpackPlugin({
			logo: PATHS.source + "/images/icons/brand.svg",
			// publicPath: '',
			// outputPath: '/assets/favicons/',
			prefix: "/assets/favicons/",
			favicons: {
				appName: "Local business",
				start_url: "/",
				display: "standalone",
				orientation: "any",
				background: "#fff",
				theme_color: "#719dca",
				icons: {
					android: [
						"android-chrome-16x16.png",
						"android-chrome-32x32.png",
						"android-chrome-192x192.png",
						"android-chrome-512x512.png",
					],
					favicons: ["favicon-16x16.png", "favicon-32x32.png"],
					appleIcon: ["apple-touch-icon-180x180.png", "apple-touch-icon-precomposed.png", "apple-touch-icon.png"],
					appleStartup: false,
					windows: false,
					yandex: false,
				},
			},
		}),
	],
};
