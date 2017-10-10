import {mapActions, mapMutations} from 'vuex';

export default {
	data: function () {
		return {
			counter: 0
		}
	},
	created: function () {
		var vm = this;
		setInterval(function () {
			vm.counter += 0.1
		}, 100)
	}
};
