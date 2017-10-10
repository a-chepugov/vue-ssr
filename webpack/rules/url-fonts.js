module.exports = function (options) {
	return {
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
			name: '[name].[ext]?[chunkhash]'
		}
	}
}
