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

const projectPath = path.join(__dirname, '..');
const bundlePathName = config.webpack.bundles.client;
const outputPath = path.join(projectPath, bundlePathName);

module.exports = function (env = {}) {
	const {
		NODE_ENV,
		DEVELOPMENT,
		isDevelopment,
		TESTING,
		PRODUCTION,
	} = getDefaultValues(env);

	let {clean, target} = env;

	const projectPath = path.join(__dirname, '..');
	const bundlePathName = config.webpack.bundles[target];
	const outputPath = path.join(projectPath, bundlePathName);

	let plugins = [
		new VueSSRClientPlugin(),
		CommonsChunkPlugin({
			name: 'common', minChunks: Infinity
		}),
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
			publicPath: bundlePathName,
		},
		resolve: {
			modules: ['node_modules', 'bower_components'],
			descriptionFiles: ['package.json', 'bower.json'],
		},
		plugins
	})
};
