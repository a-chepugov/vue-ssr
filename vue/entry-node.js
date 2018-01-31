import createApp from './app';
import recursiveComponentInit from './helpers/recursiveComponentInit';
import createMetaData from './helpers/metaData';

export default context => {
	return new Promise((resolve, reject) => {
		const {app, router, store} = createApp();
		router.push(context.url);

		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents();
			if (!matchedComponents.length) {
				return reject({code: 404});
			}

			const data = {
				store,
				router,
				route: {to: router.currentRoute},
				context,
			};

			Promise.all(matchedComponents.map(Component => recursiveComponentInit(Component, 'init', data)))
				.then(() => {
					context.state = {...store.state};
					context.meta = createMetaData(app.$meta());
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
