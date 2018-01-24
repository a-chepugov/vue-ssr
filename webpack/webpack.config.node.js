const path = require('path');
const config = require('config');
const merge = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const commonConfig = require('./webpack.config.common.js');

const projectPath = path.join(__dirname, '..');
const bundlePathName = config.webpack.bundles.node;
const bundlePath = path.join(projectPath, bundlePathName);

module.exports = function (env = {}) {
	return merge(commonConfig(env), {
		entry: {
			index: [
				'./vue/entry-node.js'
			],
		},
		output: {
			path: bundlePath,
			filename: '[name].js',
			libraryTarget: 'commonjs2',
		},
		target: 'node',
		plugins: [
			new VueSSRServerPlugin(),
		],
		resolve: {
			modules: ['node_modules', 'bower_components'],
			descriptionFiles: ['package.json', 'bower.json'],
		},
	})
};
