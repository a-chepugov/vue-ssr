'use strict';
import singleton from '../../vue/helpers/singleton';
import Ssr from '../managers/ssr';

export default function (server, vfs) {
	const ssr = new Ssr(vfs);

	function render(request, response) {
		const context = {
			cookie: request.headers.cookie,
			url: request.url
		};

		let fromContextMeta = function () {
			return context.meta.inject()
		};

		context.metaData = new Proxy(
			{getInstance: singleton(fromContextMeta)},
			{
				get (target, property) {
					let instance = target.getInstance();
					let {[property]: key} = instance || {};
					return (
						key && key.text instanceof Function ?
							key.text() :
							key
					)
				}
			});

		ssr.rendererForBundler.renderToString(context,
			(error, html) => {
				if (error) {
					console.log(error);
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
