const path = require('path');
const config = require('config');

const WriteFilePlugin = require('write-file-webpack-plugin');

const DefinePlugin = require('./plugins/DefinePlugin');
const CleanWebpackPlugin = require('./plugins/CleanWebpackPlugin');

const vueRule = require('./rules/vue');
const babelRule = require('./rules/babel');
const fontsRule = require('./rules/url-fonts');
const imagesRule = require('./rules/url-images');

const getDefaultValues = require('./getDefaultValues');

module.exports = function (env = {}) {
	let {clean, target} = env;

	let {NODE_ENV, isDevelopment, DEVELOPMENT, PRODUCTION} = getDefaultValues(env);

	let options = {
		preLoaders: {
			js: 'placeholder-loader?handler=./vue/helpers/ComponentInitHandler&placeholder=/* placeholder-ComponentInit */',
		}
	};
	if (target === 'server') {
		options.preLoaders.js += '!placeholder-loader?handler=./vue/helpers/ComponentApiHandler&placeholder=/* placeholder-ComponentApi */'
	}

	let rules = [
		vueRule(isDevelopment, target, options),
		babelRule(isDevelopment, target),
		fontsRule(),
		imagesRule()
	];

	let devtool = isDevelopment ? 'cheap-module-eval-source-map' : 'source-map';
	let watch = isDevelopment;

	let plugins = [
		DefinePlugin({
			'TARGET': JSON.stringify(target),
			'process.env': {
				NODE_ENV: `"${NODE_ENV}"` // Запись должна быть именно с такой конфигурацией кавычек
			}
		}),
	];

	switch (NODE_ENV) {
		case DEVELOPMENT: {
			plugins.push(new WriteFilePlugin());
			break;
		}
		case PRODUCTION: {
			break;
		}
	}

	const projectPath = path.resolve('.');
	const bundlePathName = config.webpack.bundles[target];

	clean ?
		plugins.push(CleanWebpackPlugin(projectPath, [bundlePathName])) :
		undefined;

	return {
		module: {
			rules
		},
		devtool,
		watch,
		plugins,
	};
};
