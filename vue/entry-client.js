import createApp from './app';

const {app, router, store} = createApp();

/* eslint-disable */
if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__);
}
/* eslint-enable */

router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to);
		const prevMatched = router.getMatchedComponents(from);

		// формируем список еще не скачанных компонентов
		let diffed = false;
		const activated = matched.filter((c, i) => {
			return diffed || (diffed = (prevMatched[i] !== c));
		});

		if (!activated.length) {
			return next();
		}

		// @todo устанавливаем индикатор загрузки
		// Выполняем метод asyncData каждого компонента
		Promise.all(activated.map(c => {
			if (c.asyncData) {
				return c.asyncData({store, route: to});
			}
		})).then(() => {
			// останавливаем индикатор загрузки
			next();
		}).catch(next);
	});

	app.$mount('#app');
});
