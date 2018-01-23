module.exports = {
	webpack: {
		public: '/public/', // Обязательно / в конце (для файлов типа chunk)
		template: 'vue/template.html',
		bundles: {
			cache: 'builds/.cache',
			client: 'builds/public',
			server: 'builds/server',
			api: 'builds/api.json',
		},
	},
	server: {
		port: process.env.NODE_APP_INSTANCE || 5000
	},
};
