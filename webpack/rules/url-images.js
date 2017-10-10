module.exports = function (options) {
	return {
		test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		loader: 'url-loader',
		options: {
			limit: 10000,
			name: '[name].[ext]?[chunkhash]'
		}
	}
};
