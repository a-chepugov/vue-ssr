module.exports = {
	webpack: {
		publicPath: '/public/', // Обязательно / в конце (для файлов типа chunk)
		template: 'vue/template.html',
		__webpack_hmr: '__webpack_hmr',
		heartbeat: 10000,
		devServer:{
			port: 7000,
			debugURL: '/___fs'
		},
		bundles: {
		  // Добавить эти директории в игнорируемые сервером, для корректной работы hot-update - supervisor -i ./builds index.js
			cache: 'builds/.cache',
			client: 'builds/public',
			server: 'builds/server',
			api: 'builds/api.json',
			api: 'builds/api.json',
		},
	},
	server: {
		port: process.env.NODE_APP_INSTANCE || 5000
	},
};
