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

let rules = [
	babelRule(),
	vueRule(),
	fontsRule(),
	imagesRule()
];

module.exports = function (env = {}) {
	let {clean, target} = env;
	let {NODE_ENV, isDevelopment} = getDefaultValues(env);

	let devtool = isDevelopment ? 'cheap-module-eval-source-map' : 'source-map';
	let watch = isDevelopment;

	let plugins = [
		new WriteFilePlugin(),
		DefinePlugin({
			'process.env': {
				NODE_ENV: `"${NODE_ENV}"` // Запись должна быть именно с такой конфигурацией кавычек
			}
		}),
	];

	const projectPath = path.join(__dirname, '..');
	const bundlePathName = config.paths.bundles[target];

	clean ?
		plugins.push(CleanWebpackPlugin(projectPath, [bundlePathName])) :
		undefined;

	const cfg = {
		module: {
			rules
		},
		devtool,
		watch,
		plugins
	};

	return cfg
};
