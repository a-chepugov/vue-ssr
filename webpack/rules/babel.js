const cache = require('./cache');

module.exports = function (isDevelopment, target, options) {
	let config = {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			{
				loader: 'babel-loader',
				options
			}]
	};
	if (isDevelopment) {
		config.use.push(cache(target, 'babel'))
	}
	return config
};
