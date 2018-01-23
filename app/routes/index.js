import * as vue from '../controllers/vue';
import staticServer from './static';

module.exports = function (server) {
	staticServer(server);

	server.get('/favicon.ico', (request, response, next) => {
		response.status(404).end();
	});
	server.get('/', vue.render);
	server.get('/2', vue.render);
	server.get('/3', vue.render);
};
