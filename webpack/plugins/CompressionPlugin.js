"use strict";
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = () =>
	new CompressionPlugin({
		cache: true,
		test: /\.js[\.\?]/,
		algorithm: 'gzip',
		deleteOriginalAssets: false,
		filename: (asset) => asset.replace(/\.js\.gz.*/, '.js.gz')
	});
