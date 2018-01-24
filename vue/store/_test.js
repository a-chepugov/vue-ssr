export default {
	namespaced: true,
	state: {
		count: 0,
	},
	actions: {
		set ({commit}, payload) {
			console.log('DEBUG:_test.js(set):8 =>');
			// commit('set', payload)
		},
	},
	mutations: {
		count (state, payload) {
			state.count += payload;
		},
	},
	getters: {
		count: ({count}) => count,
	}
}
