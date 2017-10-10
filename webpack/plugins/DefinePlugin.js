const webpack = require('webpack');

module.exports = function (params = {}) {
	return new webpack.DefinePlugin(params)
}