const path = require('path');
const config = require('config');
const {VueLoaderPlugin} = require('vue-loader');

const vueRule = require('./rules/vue');
const babelRule = require('./rules/babel');
const fontsRule = require('./rules/url-fonts');
const imagesRule = require('./rules/url-images');

module.exports = function (env = {}) {
	let {clean, target} = env;

	let {NODE_ENV, isDevelopment, isProduction, DEVELOPMENT, PRODUCTION} = require('./getDefaultValues')(env);

	let vueOptions = {
		preLoaders: {
			js: 'placeholder-loader?handler=./vue/helpers/ComponentInitHandler&placeholder=/* placeholder-ComponentInit */',
		}
	};
	if (target === 'node') {
		vueOptions.preLoaders.js += '!placeholder-loader?handler=./vue/helpers/ComponentApiHandler&placeholder=/* placeholder-ComponentApi */'
	}

	let babelOptions = {};
	let babelPreloaders = [];
	if (target === 'web') {
		babelPreloaders.push('placeholder-loader?handler=./vue/helpers/webpackStoreHot&placeholder=/* placeholder-StoreHot */')
	}

	let rules = [
		vueRule(isDevelopment, target, vueOptions),
		babelRule(isDevelopment, target, babelOptions, babelPreloaders),
		fontsRule(),
		imagesRule()
	];

	let plugins = [];

	try {
		plugins.push(new VueLoaderPlugin());
		plugins.push(require('./plugins/DefinePlugin')({
			'TARGET': JSON.stringify(target),
			'process.env': {
				NODE_ENV: `"${NODE_ENV}"` // Запись должна быть именно с такой конфигурацией кавычек
			}
		}));

		switch (NODE_ENV) {
			case DEVELOPMENT: {
				plugins.push(require('./plugins/HardSourceWebpackPlugin')());
				break;
			}
			case PRODUCTION: {
				break;
			}
		}

		if (clean) {
			const projectPath = path.resolve('.');
			const bundlePathName = config.webpack.bundles[target];
			plugins.push(require('./plugins/CleanWebpackPlugin')(projectPath, [bundlePathName]))
		}
	} catch (error) {
		console.error(error);
	}

	return {
		module: {
			rules
		},
		plugins,
		devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',
		watch: isDevelopment,
		mode: isProduction ? 'production' : 'development'
	};
};
