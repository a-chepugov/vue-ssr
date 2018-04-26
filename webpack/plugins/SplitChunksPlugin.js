const webpack = require('webpack');
module.exports = function (option) {
	let q = new webpack.optimize.SplitChunksPlugin(option);
	return q
};
