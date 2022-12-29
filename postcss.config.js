const purgecss = require("@fullhuman/postcss-purgecss");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = function (mode) {
	// syntax: 'postcss-scss',
	if (mode === "development") {
		return {
			plugins: ["mqpacker", postcssPresetEnv()],
		};
	}

	return {
		plugins: [
			"mqpacker",
			postcssPresetEnv(),
			purgecss({
				content: ["./src/**/*.pug"],
				safelist: ["collapsing", "show-collapse", "active"],
			}),
		],
	};
};
