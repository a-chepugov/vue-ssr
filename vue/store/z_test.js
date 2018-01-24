export default {
	namespaced: true,
	state: {
		count: 0,
	},
	actions: {
		set ({commit}, payload) {
			return commit('set', payload)
		},
	},
	mutations: {
		set (state, payload) {
			state.count += payload;
		},
	},
	getters: {
		get ({count}) {
			return count
		},
	}
}
