"use strict";
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = (root, paths) =>
	new CleanWebpackPlugin(
		paths, {
			root,
			verbose: true,
			dry: false,
		}
	);
