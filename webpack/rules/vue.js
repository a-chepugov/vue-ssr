module.exports = function (isDevelopment, target, options) {
	let config = {
		test: /\.vue$/,
		use: [
			{
				loader: 'vue-loader',
				options
			}
		]
	};
	return config
};
