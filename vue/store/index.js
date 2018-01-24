function getModules() {
	return {
		device: require("./device").default,
		lang: require("./lang").default,
		l10n: require("./l10n").default,
	}
};

const modulesForHotReplacement = {
	device: '',
	lang: '',
	l10n: '',
};

module.exports = function () {
	let Vue = require("vue").default;
	let Vuex = require("vuex").default;

	Vue.use(Vuex);

	const store = new Vuex.Store({
		modules: getModules()
	});

	if (module.hot) {
		module.hot.accept(/* placeholder-StoreHot */(id) => {
			console.info(`Hot replacement for module ${id}`);
			const modules = getModules();
			store.hotUpdate({modules});
		})
	}

	return store
};

module.exports.modulesForHotReplacement = modulesForHotReplacement;
