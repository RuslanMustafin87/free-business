const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common");

const PATHS = {
	source: path.resolve(__dirname, "..", "src"),
	build: path.resolve(__dirname, "..", "dist"),
};

module.exports = merge([
	common,
	{
		mode: "production",
		output: {
			clean: true,
			// publicPath: "/assets/",
			// assetModuleFilename: "assets/[name][ext]",
		},
		optimization: {
			minimize: true,
			minimizer: [new CssMinimizerPlugin()],
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					default: false,
					commons: {
						test: /\.(js|css|scss)$/,
						chunks: "all",
						minChunks: 2,
						name: "common",
						enforce: true,
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash].css",
			}),
			new CopyPlugin({
				patterns: [
					{
						from: PATHS.source + "/images/favicons/",
						to: PATHS.build + "/assets/",
					},
				],
			}),
		],
	},
]);
