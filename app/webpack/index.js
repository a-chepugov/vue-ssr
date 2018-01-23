import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from 'config';
import path from 'path';
import fs from 'fs';

const __webpack_hmr = config.webpack.__webpack_hmr;
const bundlePathName = config.webpack.bundles.client;
const debugURL = config.webpack.devServer.debugURL;
const bundlePath = path.resolve('builds/');
const publicPath = config.webpack.publicPath;
const heartbeat = config.webpack.heartbeat;

const webpackConfig = require('../../webpack.js')({target: 'client'});

const compiler = webpack(webpackConfig);
const clientDevMiddleware = webpackDevMiddleware(compiler);
const clientHotMiddleware = webpackHotMiddleware(compiler, {
	log: console.log,
	path: `${publicPath}${__webpack_hmr}`,
	heartbeat
});

const urlPattert = new RegExp(`^${debugURL.replace('([/])', '\$1')}`);

function getData(fs, stats, path){
	switch (true) {
		case stats.isFile():
			return fs.readFileSync(path);
			break;
		case stats.isDirectory():
			return  fs.readdirSync(path);
			break;
		default:
			return 'Unknown file type';
	}
}

function devFs(devMiddleware, request, response, next) {
	if (request.url.match(urlPattert)) {
		const pathRelative = request.url.replace(urlPattert, '');
		const pathAbsolute = path.resolve(path.join(bundlePath, pathRelative));

		devMiddleware.fileSystem.stat(pathAbsolute, (error, stats) => {
			if (error) {
				console.error(error)
			} else {
				let data = getData(devMiddleware.fileSystem, stats, pathAbsolute);
				response.send(data);
			}
		});
	} else {
		next()
	}
}

devFs = devFs.bind(undefined, clientDevMiddleware);

module.exports = function (app) {
	app.use(clientDevMiddleware);
	app.use(clientHotMiddleware);
	app.use(devFs);
};
