import createApp from './app';

const {app, router, store} = createApp();
import recursiveComponentInit from './helpers/recursiveComponentInit';

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

		const data = {store, router, route: {to, from}, matched, prevMatched};

		// @todo устанавливаем индикатор загрузки
		Promise.all(activated.map(Component => recursiveComponentInit(Component, 'init', data)))
			.then(() => {
				// останавливаем индикатор загрузки
				next();
			})
			.catch(next);
	});

	app.$mount('#app');
});
