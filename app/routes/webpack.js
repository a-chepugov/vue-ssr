import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from 'config';
import path from 'path';
import url from 'url';

import vue from '../controllers/vue';

const __webpack_hmr = config.webpack.__webpack_hmr;
const heartbeat = config.webpack.heartbeat;
const clientBundlePathName = config.webpack.bundles.web;
const publicPath = config.webpack.publicPath;

const clientWebpackConfig = require('../../webpack.js')({target: 'web'});
const serverWebpackConfig = require('../../webpack.js')({target: 'node'});
const clientCompiler = webpack(clientWebpackConfig);
const serverCompiler = webpack(serverWebpackConfig);
const clientDevMiddleware = webpackDevMiddleware(clientCompiler);
const clientHotMiddleware = webpackHotMiddleware(clientCompiler, {
	log: console.log,
	path: `${publicPath}${__webpack_hmr}`,
	heartbeat
});
const serverDevMiddleware = webpackDevMiddleware(serverCompiler);

const staticPattert = new RegExp(`^${publicPath.replace('([/])', '\$1')}`);

function statics(request, response, next) {
	if (request.url.match(staticPattert)) {
		let filePath;
		try {
			filePath = path.resolve(path.join(clientBundlePathName, url.parse(request.url).pathname.replace(staticPattert, '')));
			response.send(clientDevMiddleware.fileSystem.readFileSync(filePath));
		} catch (error) {
			console.error(`ошибка получения с виртуальной файловой системы файла ${filePath}`);
			next()
		}
	} else {
		next()
	}
}

const onBundlesReady = (...DevMiddlewares) =>
	Promise.all(DevMiddlewares.map(item =>
			new Promise((resolve, reject) =>
				item.waitUntilValid((...args) =>
					resolve(...args))
			)
		)
	);


let ssr;
module.exports = function (app) {
	app.use(serverDevMiddleware);
	app.use(clientDevMiddleware);
	app.use(clientHotMiddleware);

	// Подключаем сборки Vue с виртуальной файловой системы
	onBundlesReady(clientDevMiddleware, serverDevMiddleware)
		.then(() => {
			// раздача статических файлов с виртуальной файловой системы
			app.use(statics);

			ssr = vue(app, {
				client: clientDevMiddleware.fileSystem,
				server: serverDevMiddleware.fileSystem
			});

			app.use((response, request, next) => {
				onBundlesReady(clientDevMiddleware, serverDevMiddleware)
					.then(() => ssr.init({
						client: clientDevMiddleware.fileSystem,
						server: serverDevMiddleware.fileSystem
					}));
				next()
			});
		})
};
