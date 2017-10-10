'use strict';
import fs from 'fs';

const {createBundleRenderer} = require('vue-server-renderer');

let serverbundle = require('../../server/vue-ssr-server-bundle.json');
let clientManifest = require('../../public/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./vue/template.html', 'utf8');

const rendererForBundler = createBundleRenderer(serverbundle,
	{
		runInNewContext: 'once',
		template,
		clientManifest,
	}
);

export function render(request, response) {
	const context = {
		url: request.url,
		title: 'Vue SSR',
	};

	rendererForBundler.renderToString(context,
		(error, html) => {
			if (error) {
				console.log(error);
				response.status(500)
			} else {
				response.send(html)
			}
		}
	)
}
