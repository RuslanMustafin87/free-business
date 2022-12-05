const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (mode) {
	const isProductionMode = mode === 'production';
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'postcss-loader',
					],
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'postcss-loader',
						'sass-loader',
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: isProductionMode ? 'css/[name].[contenthash].css' : '[name].css',
			}),
		],
	};
};
