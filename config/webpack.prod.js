const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const common = require("./webpack.common.js");

const PATHS = {
	source: resolve(__dirname, "..", "src"),
	build: resolve(__dirname, "..", "dist"),
};

module.exports = merge([
	common,
	{
		mode: "production",
		output: {
			path: PATHS.build,
			filename: "assets/js/[name].[contenthash:8].js",
			clean: true,
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
					vendor: {
						name: "vendors",
						test: /node_modules/,
						chunks: "all",
						enforce: true,
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.s?css$/,
					exclude: /node_modules/,
					use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "assets/css/[name].[contenthash:8].css",
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
						to: `${PATHS.build}/assets/favicons`,
					},
				],
			}),
		],
	},
]);
