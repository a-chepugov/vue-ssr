module.exports = {
	port: 5000,
	webpack: {
		public: '/public/', // Обязательно / в конце (для файлов типа chunk)
		bundles: {
			cache: 'builds/.cache',
			client: 'build/public/',
			server: 'build/server/',
		},
		template: 'vue/template.html',
	}
};
