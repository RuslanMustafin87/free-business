module.exports = function() {
	return {
		module: {
			rules: [{
				test: /\.woff2|woff|ttf$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name].[contenthash:8][ext]'
				},
			}]
		}
	};
};