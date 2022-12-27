// const purgecss = require("@fullhuman/postcss-purgecss");
// const postcssPresetEnv = require("postcss-preset-env");
import purgecss from "@fullhuman/postcss-purgecss";
import postcssPresetEnv from "postcss-preset-env";

export default function (mode) {
	// syntax: 'postcss-scss',
	// console.log(api.mode);
	// console.log("kkk");
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
}
