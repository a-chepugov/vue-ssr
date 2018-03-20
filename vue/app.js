import Vue from 'vue';
import App from './App/index.vue';
import createRouter from './router';
import createStore from './store';
import {sync} from 'vuex-router-sync';
import Meta from 'vue-meta'

Vue.use(Meta, {
	keyName: 'metaInfo', // the component option name that vue-meta looks for meta info on.
	attribute: 'data-vue-meta', // the attribute name vue-meta adds to the tags it observes
	ssrAttribute: 'data-vue-meta-server-rendered', // the attribute name that lets vue-meta know that meta info has already been server-rendered
	tagIDKeyName: 'vmid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
});

import mixinsGlobal from './mixins/global';
import routeToLang from './mixins/routeToLang';
import deviceChecker from './mixins/deviceChecker';

Vue.mixin(mixinsGlobal);

Vue.component('no-ssr', require('./components/_aux/no-ssr').default);
Vue.component('vue-fw', require('./components/_aux/functional-wrapper').default);

export default function createApp() {
	const router = createRouter();
	const store = createStore();

	sync(store, router);
	let app = new Vue({
		mixins: [routeToLang, deviceChecker],
		router,
		store,
		render: h => h(App),
	});
	return {app, router, store};
};

/* eslint-disable */
if (module.hot) {
	module.hot.accept();
}
/* eslint-enable */
