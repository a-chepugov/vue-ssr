import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import {sync} from 'vuex-router-sync';

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
