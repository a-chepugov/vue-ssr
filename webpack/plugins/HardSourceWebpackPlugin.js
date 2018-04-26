"use strict";
module.exports = () => {
	new HardSourceWebpackPlugin({
		cacheDirectory: './node_modules/.cache/hard-source/[confighash]',
		configHash: function (webpackConfig) {
			return require('node-object-hash')({sort: false}).hash(webpackConfig);
		},
		environmentHash: {
			root: process.cwd(),
			directories: [],
			files: ['package-lock.json', 'yarn.lock'],
		},
	})
};
