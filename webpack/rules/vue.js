module.exports = function (options) {
	return {
		test: /\.vue$/,
		loader: 'vue-loader',
		options
	}
}