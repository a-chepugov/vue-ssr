const webpack = require('webpack');

module.exports = function (option) {
	return new webpack.optimize.CommonsChunkPlugin(option)
};
