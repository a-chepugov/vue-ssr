const path = require('path');
const config = require('config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const commonConfig = require('./webpack.config.common.js');

module.exports = function (env = {}) {
	const {
		NODE_ENV,
		DEVELOPMENT,
		isDevelopment,
		PRODUCTION,
	} = require('./getDefaultValues')(env);

	let {target} = env;

	const __webpack_hmr = config.webpack.__webpack_hmr;
	const heartbeat = config.webpack.heartbeat;
	const bundlePathName = config.webpack.bundles[target];
	const bundlePath = path.resolve(bundlePathName);
	const publicPath = config.webpack.publicPath;

	let plugins = [];

	try {
		plugins.push(new VueSSRClientPlugin());
	} catch (error) {
		console.error(error);
	}

	let entry = {
		index: [
			'../vue/entry-web.js',
		],
		vendor: ['vue'],
	};

	try {
		switch (NODE_ENV) {
			case DEVELOPMENT: {
				entry.index.unshift(`webpack-hot-middleware/client?path=${__webpack_hmr}&timeout=${heartbeat}&name=${target}&reload=true&dynamicPublicPath=true`);
				plugins.push(new webpack.HotModuleReplacementPlugin());
				break;
			}
			case PRODUCTION: {
				plugins.push(require('./plugins/UglifyJsPlugin')());
				plugins.push(require('./plugins/SplitChunksPlugin')({name: 'common',   chunks: "async",}));
				break;
			}
		}
	} catch (error) {
		console.error(error);
	}
	return merge(commonConfig(env), {
		optimization: {runtimeChunk: true},
		context: path.join(__dirname),
		entry,
		output: {
			filename: '[name].js?[hash]',
			chunkFilename: '[name]-chunk.js?[hash]',
			path: bundlePath,
			library: '[name]',
			publicPath,
		},
		target: 'web',
		resolve: {
			modules: ['node_modules', 'bower_components'],
			descriptionFiles: ['package.json', 'bower.json'],
		},
		plugins
	})
};
