module.exports = function (isDevelopment, target, options, preloaders = []) {
	let config = {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: [
			{
				loader: 'babel-loader',
				options
			}
		]
	};
	config.use.splice(0, 0, ...preloaders);
	return config
};
