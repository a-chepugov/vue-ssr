module.exports = {
	port: 5000,
	webpack: {
		public: '/public/', // Обязательно / в конце (для файлов типа chunk)
		bundles: {
			client: 'public/',
			server: 'server/',
			template: 'vue/template.html',
		}
	}
};
