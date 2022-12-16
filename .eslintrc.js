module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
		node: true
	},
	extends: [
		"eslint:recommended"
		// 'prettier',
		// 'prettier/vue',
		// 'plugin:prettier/recommended',
		//   'plugin:nuxt/recommended'
	],
	// plugins: ['prettier'],
	// add your custom rules here
	parserOptions: {
		sourceType: "module"
	},
	rules: {
		semi: [ "error", "always" ],
		indent: [ "error", "tab" ],
		eqeqeq: [
			"error",
			"always",
			{ null: "ignore" }
		],
		"comma-dangle": [ "error", "never" ],
		// 'vue/max-attributes-per-line': 'off',
		"arrow-spacing": "error",
		"array-bracket-newline": "error",
		"array-bracket-spacing": [ "error", "always" ],
		"array-element-newline": [ "error", { minItems: 3 } ],
		"block-spacing": "error",
		"brace-style": [
			"error",
			"1tbs",
			{ allowSingleLine: true }
		],
		"comma-spacing": "error",
		"key-spacing": "error",
		"prefer-const": "error",
		"prefer-destructuring": "warn",
		"prefer-object-spread": "warn",
		"object-curly-newline": "error",
		"object-curly-spacing": [ "error", "always" ],
		"operator-assignment": "error",
		"semi-spacing": "error",
		quotes: "error",
		"keyword-spacing": "error",
		// 'object-property-newline': [ 'error', { minProperties: 3 } ],
		"no-var": "error",
		"no-console": process.env.MODE === "production" ? "error" : "off",
		"no-debugger": process.env.MODE === "production" ? "error" : "off"
	}
};
