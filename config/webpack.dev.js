// import { HotModuleReplacementPlugin } from "webpack";
import webpack from "webpack";
// const webpack = require("webpack");
import { merge } from "webpack-merge";
import ESLintPlugin from "eslint-webpack-plugin";
import postcssConfig from "../postcss.myconfig.js";
import common from "./webpack.common.js";

export default merge([
	common,
	{
		mode: "development",
		module: {
			rules: [
				// {
				// 	test: /\.css$/,
				// 	exclude: /node_modules/,
				// 	use: ["style-loader", "css-loader", "postcss-loader"],
				// },
				{
					test: /\.s?css$/,
					exclude: /node_modules/,
					use: [
						"style-loader",
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: postcssConfig("development"),
							},
						},
						"sass-loader",
					],
				},
			],
		},
		// plugins: [new ESLintPlugin(), new HotModuleReplacementPlugin()],
		plugins: [new ESLintPlugin(), new webpack.HotModuleReplacementPlugin()],
		devServer: {
			historyApiFallback: true,
			compress: true,
			port: 3010,
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
