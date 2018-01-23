const path = require('path');
const config = require('config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const commonConfig = require('./webpack.config.common.js');
const getDefaultValues = require('./getDefaultValues');

const CommonsChunkPlugin = require('./plugins/CommonsChunkPlugin');
const ClosureCompilerPlugin = require('./plugins/ClosureCompilerPlugin');

module.exports = function (env = {}) {
	const {
		NODE_ENV,
		DEVELOPMENT,
		isDevelopment,
		PRODUCTION,
	} = getDefaultValues(env);

	let {target} = env;

	const __webpack_hmr = config.webpack.__webpack_hmr;
	const heartbeat = config.webpack.heartbeat;
	const bundlePathName = config.webpack.bundles.web;
	const bundlePath = path.resolve(bundlePathName);
	const publicPath = config.webpack.publicPath;

	let plugins = [
		new VueSSRClientPlugin(),
		CommonsChunkPlugin({name: 'runtime', minChunks: Infinity}),
	];

	let entry = {
		index: [
			'../vue/entry-client.js',
		],
		vendor: ['vue'],
	};

	switch (NODE_ENV) {
		case DEVELOPMENT: {
			entry.index.push(`webpack-hot-middleware/client?path=${__webpack_hmr}&timeout=${heartbeat}&name=${target}&reload=true&dynamicPublicPath=true`);
			plugins = plugins.concat(
				new webpack.HotModuleReplacementPlugin(),
			);
			break;
		}
		case PRODUCTION: {
			plugins = plugins.concat(
				CommonsChunkPlugin({name: 'common'}),
				ClosureCompilerPlugin(),
			);
			break;
		}
	}

	return merge(commonConfig(env), {
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
