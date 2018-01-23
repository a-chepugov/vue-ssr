import createApp from './app';

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
					if (Component.init) {
						return Component.init({
							cookie: context.cookie,
							store,
							to: router.currentRoute
						});
					}
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
			console.error(error)
		});
};
