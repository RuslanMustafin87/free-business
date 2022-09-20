module.exports = function() {
	return {
		module: {
			rules: [{
					test: /\.(jpe?g|png|webp)$/,
					type: 'asset/resource',
					generator: {
						// filename: 'images/[hash][ext]'
						filename: 'images/[name].[contenthash:8][ext]'
					},
				},
				{
					test: /\.svg$/,
					type: 'asset/resource',
					generator: {
						filename: 'images/icons/[name].[contenthash:8][ext]'
					},
					use: [{
						loader: 'svgo-loader',
						options: {
							plugins: [{
								name: 'cleanupIDs',
								active: false
							}]
						}
					}]
				}
			]
		}
	};
};