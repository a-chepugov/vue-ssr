import path from 'path';
import config from 'config';
import express from 'express';

module.exports = function (app) {
	let clientBundlePath = config.webpack.bundles.client;
	let clientBundleRealPath = path.resolve(clientBundlePath);
	let publicPath = config.webpack.publicPath;
	app.use(publicPath, express.static(clientBundleRealPath));
};
