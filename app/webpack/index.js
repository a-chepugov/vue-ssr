import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from 'config';

const __webpack_hmr = config.webpack.__webpack_hmr;
const publicPath = config.webpack.publicPath;
const heartbeat = config.webpack.heartbeat;

const webpackConfig = require('../../webpack.js')({target: 'client'});
const compiler = webpack(webpackConfig);

module.exports = function (app) {
	// вызывает циклическую перезагрузку при запуске приложения через supervisor
	app.use(webpackDevMiddleware(compiler, {
		hot: true,
		stats: {
			colors: true,
		},
		historyApiFallback: true,
	}));

	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
		path: `${publicPath}${__webpack_hmr}`,
		heartbeat
	}));
};
