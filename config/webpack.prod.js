import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
// import common from "./webpack.common";
import common from "./webpack.common.js";
import zlib from "zlib";
import purgecss from "@fullhuman/postcss-purgecss";
import postcssPresetEnv from "postcss-preset-env";
import postcssConfig from "../postcss.myconfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATHS = {
	source: resolve(__dirname, "..", "src"),
	build: resolve(__dirname, "..", "dist"),
};

export default merge([
	common,

	{
		mode: "production",
		output: {
			path: PATHS.build,
			filename: "js/[name].[contenthash:8].js",
			clean: true,
			// publicPath: "assets/",
			assetModuleFilename: "assets/",
		},
		optimization: {
			minimize: true,
			minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					default: false,
					commons: {
						test: /\.(js|css|scss)$/,
						name: "common",
						chunks: "all",
						minChunks: 2,
						enforce: true,
					},
				},
			},
		},
		module: {
			rules: [
				// {
				// 	test: /\.css$/,
				// 	exclude: /node_modules/,
				// 	use: [
				// 		MiniCssExtractPlugin.loader,
				// 		"css-loader",
				// 		"postcss-loader"
				// 	],
				// },
				{
					test: /\.s?css$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: postcssConfig("production")
							},
						},
						"sass-loader"
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash].css",
			}),
			new CompressionPlugin({
				filename: "[path][base].br",
				algorithm: "brotliCompress",
				test: /\.(js|css|html|woff2|woff|ttf)$/,
				compressionOptions: {
				  params: {
					[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
				  },
				},
				threshold: 10240,
				minRatio: 0.8,
				deleteOriginalAssets: false,
			}),
			new CopyPlugin({
				patterns: [
					{
						from: `${PATHS.source}/images/favicons`,
						to: `${PATHS.build}/assets`,
					},
				],
			}),
		],
	},
]);
