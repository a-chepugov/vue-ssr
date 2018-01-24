import createApp from './app';
import recursiveComponentInit from './helpers/recursiveComponentInit';

export default context => {
	return new Promise((resolve, reject) => {
		const {app, router, store} = createApp();
		router.push(context.url);
		context.meta = app.$meta();

		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			if (!matchedComponents.length) {
				return reject({code: 404});
			}

			Promise.all(matchedComponents.map(Component => {
					const data = {
						cookie: context.cookie,
						store,
						to: router.currentRoute
					};
					return recursiveComponentInit(Component, 'init', data);
				}))
				.then(() => {
					context.state = {...store.state};
					resolve(app)
				})
				.catch(reject);
		}, reject);
	})
		.catch((error) => {
			console.error(context.url);
			throw error
		});
};
