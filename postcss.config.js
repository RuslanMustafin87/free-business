const purgecss = require('@fullhuman/postcss-purgecss');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = (api) => {
	// syntax: 'postcss-scss',
	if (api.mode === 'development') {
		return {
			plugins: [
				'mqpacker',
				postcssPresetEnv(),
				['postcss-font-magician',
					{
						variants: {
							'Open Sans': {
								'300': [],
								'400': [],
							},
						},
						formats: 'woff2 woff ttf',
						display: 'swap'
					}
				],
			]
		};
	};

	return {
		plugins: [
			'mqpacker',
			postcssPresetEnv(),
			purgecss({
				content: ['./src/**/*.pug'],
				safelist: ['collapsing', 'show-collapse']
			}),
			['postcss-font-magician',
				{
					variants: {
						'Open Sans': {
							'300': [],
							'400': [],
						},
					},
					formats: 'woff2 woff ttf',
					display: 'swap'
				}
			],
		]
	};

};