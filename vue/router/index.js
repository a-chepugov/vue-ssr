import Vue from 'vue';
import Router from 'vue-router';

const Page1 = () => import('../components/Page1/index.vue');
const Page2 = () => import('../components/Page2/index.vue');
const Page3 = () => import('../components/Page3/index.vue');

Vue.use(Router);

export default function () {
	return new Router({
		mode: 'history',
		routes: [
			{
				path: '/',
				name: 'Page1',
				component: Page1
			},
			{
				path: '/2',
				name: 'Page2',
				component: Page2
			},
			{
				path: '/3',
				name: 'Page3',
				component: Page3
			}
		]
	});
}
