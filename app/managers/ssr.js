import fs from 'fs';
import path from 'path';
import config from 'config';
import {createBundleRenderer} from 'vue-server-renderer';

export default class {
	constructor(vfs) {
		console.info('Подключаем сборки Vue');
		this.serverBundleFile = path.resolve(config.webpack.bundles.node, 'vue-ssr-server-bundle.json');
		this.clientManifestFile = path.resolve(config.webpack.bundles.web, 'vue-ssr-client-manifest.json');
		this.templatePath = path.resolve(config.webpack.template);
		this.init(vfs);
	}

	init({client, server} = {}) {
		try {
			let fsServer = server ? server : fs;
			let fsClient = client ? client : fs;
			const serverBundle = JSON.parse(fsServer.readFileSync(this.serverBundleFile, 'utf8'));
			const clientManifest = JSON.parse(fsClient.readFileSync(this.clientManifestFile, 'utf8'));
			const template = fs.readFileSync(this.templatePath, 'utf8');

			this.rendererForBundler = createBundleRenderer(serverBundle,
				{
					runInNewContext: true,
					template,
					clientManifest,
				});
		} catch (error) {
			console.error(error);
		}
	}
}
