import Page1_1 from './Page1_1/index.vue';

export default {
	init() {
		console.log('Инициализация корневого компонента');
	},
	components: {
		Page1_1
	},
	data: function () {
		return {
			counter: 0
		}
	},
	created: function () {
		const vm = this;
		setInterval(function () {
			vm.counter += 0.1
		}, 100);
		console.log('created');
	}
};
