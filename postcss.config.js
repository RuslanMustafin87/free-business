// const purgecss = require("@fullhuman/postcss-purgecss");
import purgecss from "@fullhuman/postcss-purgecss";
// const postcssPresetEnv = require("postcss-preset-env");
import postcssPresetEnv from "postcss-preset-env";

export default function (api) {
	// syntax: 'postcss-scss',
	console.log(api.mode);
	console.log("kkk");
	if (api.mode === "development") {
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
				// safelist: ["collapsing", "show-collapse", "active"],
			}),
		],
	};
}
