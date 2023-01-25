const webpack = require("webpack");
const { merge } = require("webpack-merge");
const ESLintPlugin = require("eslint-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge([
	common,
	{
		mode: "development",
		module: {
			rules: [
				{
					test: /\.s?css$/,
					exclude: /node_modules/,
					use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
				},
			],
		},
		plugins: [new ESLintPlugin(), new webpack.HotModuleReplacementPlugin()],
		devServer: {
			historyApiFallback: true,
			compress: true,
			port: 3011,
			watchFiles: {
				paths: ["src/**/*.*"],
				options: {
					usePolling: true,
				},
			},
		},
		devtool: "eval-source-map",
	},
]);
