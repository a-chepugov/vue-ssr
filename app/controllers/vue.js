'use strict';
import Ssr from '../managers/ssr';

export default function (server, vfs) {
	const ssr = new Ssr(vfs);

	function render(request, response) {
		const context = {request, response};

		ssr.rendererForBundler.renderToString(context,
			(error, html) => {
				if (error) {
					console.error(error);
					response.status(500);
				} else {
					response.send(html)
				}
			}
		)
	}

	server.get(/.*/, render);
	return ssr
}
