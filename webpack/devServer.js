module.exports = function() {
	return {
		devServer: {
			historyApiFallback: true,
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			open: true,
			compress: true,
			port: 3010,
			hot: true
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		],

	};
};