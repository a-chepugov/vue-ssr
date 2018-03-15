'use strict';
import Ssr from '../helpers/ssr';

export default function (app, vfs) {
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

	app.get(/.*/, render);
	return ssr
}
