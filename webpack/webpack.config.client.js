const path = require('path');
const config = require('config');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const commonConfig = require('./webpack.config.common.js');
const getDefaultValues = require('./getDefaultValues');

const CommonsChunkPlugin = require('./plugins/CommonsChunkPlugin');
const AggressiveSplittingPlugin = require('./plugins/AggressiveSplittingPlugin');
const ClosureCompilerPlugin = require('./plugins/ClosureCompilerPlugin');


module.exports = function (env = {}) {
	const {
		NODE_ENV,
		DEVELOPMENT,
		PRODUCTION,
	} = getDefaultValues(env);

	let {clean, target} = env;

	const bundlePathName = config.webpack.bundles.client;
	const outputPath = path.resolve(bundlePathName);
	const publicPath = config.webpack.public;

	const plugins = [
		new VueSSRClientPlugin()
	];

	let entry = {
		index: [
			'../vue/entry-client.js',
		],
		vendor: ['vue'],
	};

	switch (NODE_ENV) {
		case DEVELOPMENT: {
			entry.index.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
			plugins.push(new webpack.HotModuleReplacementPlugin());
			break;
		}
		case PRODUCTION: {
			plugins.push(CommonsChunkPlugin({
				name: 'runtime', minChunks: Infinity
			}));
			plugins.push(CommonsChunkPlugin({
				name: 'common'
			}));
			plugins.push(AggressiveSplittingPlugin());
			plugins.push(ClosureCompilerPlugin());
			break;
		}
	}

	return merge(commonConfig(env), {
		context: path.join(__dirname),
		entry,
		output: {
			filename: '[name].js?[hash]',
			chunkFilename: '[name]-chunk.js?[hash]',
			path: outputPath,
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
