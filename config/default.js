module.exports = {
	port: 5000,
	webpack: {
		public: '/public/', // Обязательно / в конце (для файлов типа chunk)
		bundles: {
			client: 'build/public/',
			server: 'build/server/',
		},
		template: 'vue/template.html',
	}
};
