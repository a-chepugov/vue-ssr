import Vue from 'vue';
import App from './App.vue';
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

export default function createApp() {
	const router = createRouter();
	const store = createStore();

	sync(store, router);
	var app = new Vue({
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
