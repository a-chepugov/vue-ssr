let server = require('./webpack/webpack.config.server');
let client = require('./webpack/webpack.config.client');

module.exports = function (env = {}) {
	let target = env.target;

	switch (env.target) {
		case 'server':
			return server(env);
		case 'client':
			return client(env);
		default:
			console.error(`Конфигурация для ${target} не найдена`)
	}
};
