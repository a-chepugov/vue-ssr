'use strict';
console.info('Подключаем Vue');
import fs from 'fs';
import path from 'path';
import config from 'config';
import {createBundleRenderer} from 'vue-server-renderer';
import singleton from '../../vue/helpers/singleton';
import requireNoCache from '../helpers/requireNoCache';

const clientBuildsPathName = config.webpack.bundles.client;
const serverBuildsPathName = config.webpack.bundles.server;
const templatePath = config.webpack.template;

let serverBundleFile = path.resolve(serverBuildsPathName, 'vue-ssr-server-bundle.json');
let clientManifestFile = path.resolve(clientBuildsPathName, 'vue-ssr-client-manifest.json');

class Ssr {
	constructor({serverBundleFile, clientManifestFile, templatePath}){
		this.serverBundleFile = serverBundleFile;
		this.clientManifestFile = clientManifestFile;
		this.templatePath = templatePath;
		this.init();
	}

	init() {
		const serverBundle = requireNoCache(this.serverBundleFile);
		const clientManifest = requireNoCache(this.clientManifestFile);
		const template = fs.readFileSync(path.resolve(this.templatePath), 'utf8');

		this.rendererForBundler = createBundleRenderer(serverBundle,
			{
				runInNewContext: false,
				template,
				clientManifest,
			});
	}
}

export const ssr = new Ssr({serverBundleFile, clientManifestFile, templatePath});

export function render(request, response) {
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
