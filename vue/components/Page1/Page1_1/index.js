import {mapGetters} from 'vuex';

export default {
	init({store}) {
		console.log('Инициализация дочернего компонента');
		store.dispatch('z_test/set', 1)
	},
	data: function () {
		return {}
	},
	computed: {
		...mapGetters({count: 'z_test/get'}),
	},
};
