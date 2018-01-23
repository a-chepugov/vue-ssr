const path = require('path');
const config = require('config');

const cachePath = config.webpack.bundles.cache;
const cacheRealPath = path.resolve(cachePath);

module.exports = function (target = '_', rule = '_') {
	return {
		loader: 'cache-loader',
		options: {
			cacheDirectory: path.join(cacheRealPath, target, rule)
		}
	}
};
