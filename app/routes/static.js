import path from 'path';
import config from 'config';
import express from 'express';

module.exports = function (app) {
	let clientBundlePath = config.paths.bundles.client;
	let clientBundleRealPath = path.resolve(__dirname, '../..', clientBundlePath);
	app.use(`/${clientBundlePath}`, express.static(clientBundleRealPath));
}

