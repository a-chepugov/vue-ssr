const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (root, paths) {
	return new CleanWebpackPlugin(
		paths, {
			root,
			verbose: true,
			dry: false,
		})
}
