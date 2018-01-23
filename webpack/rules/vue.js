const cache = require('./cache');

module.exports = function (isDevelopment, target, options) {
	let config = {
		test: /\.vue$/,
		use: [
			{
				loader: 'vue-loader',
				options
			}
		]
	}
	if (isDevelopment) {
		config.use.push(cache(target, 'vue'))
	}
	return config
};
