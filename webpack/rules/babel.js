module.exports = function (options) {
	return {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: 'babel-loader',
			options
		}
	}
}