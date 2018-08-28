module.exports = {
	webpack: {
		publicPath: '/public/', // Обязательно / в конце (для файлов типа chunk)
		template: 'vue/template.html',
		__webpack_hmr: '__webpack_hmr',
		heartbeat: 3000,
		bundles: {
			// Добавить эти директории в игнорируемые сервером, для корректной работы hot-update - supervisor -i ./builds index.js
			web: 'build/web',
			node: 'build/node',
			api: 'build/api.json',
		},
	},
	server: {
		port: process.env.NODE_APP_INSTANCE || 9999
	},
};
