import path from 'path';
import config from 'config';

const dynamicApiPathConfig = config.webpack.bundles.api;

module.exports = function (server) {
	let apis;
	try {
		let dynamicApiPath = path.resolve(dynamicApiPathConfig);
		apis = require(dynamicApiPath);
	} catch (error) {
		const message = `\ndynamic api file not found.\n`;
		error.message += message;
		console.error(message);
	}
	if (apis instanceof Array) {
		apis.forEach((item) => {
			try {
				require(item)(server);
			} catch (error) {
				let message = `\nAppending location to api error with ${item}\n`;
				console.error(message);
			}
		})
	}
};
