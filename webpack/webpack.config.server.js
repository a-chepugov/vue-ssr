const path = require('path');
const config = require('config');
const merge = require('webpack-merge');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const commonConfig = require('./webpack.config.common.js');
const getDefaultValues = require('./getDefaultValues');

const projectPath = path.join(__dirname, '..');
const bundlePathName = config.paths.bundles.server;
const outputPath = path.join(projectPath, bundlePathName);

module.exports = function (env = {}) {
	return merge(commonConfig(env), {
		entry: {
			index: [
				'./vue/entry-server.js'
			],
		},
		output: {
			path: outputPath,
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
