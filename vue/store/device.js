import devices from '../../constants/devices'

export default {
	namespaced: true,
	state: {
		id: Number.MAX_VALUE,
	},
	mutations: {
		set: (state, id) => state.id = id,
		setByName: (state, name) => state.id = devices[name].id,
	},
	getters: {
		name: (getters) => {
			for (let device of Object.values(devices)) {
				if (device.id === getters.id) {
					return device.name;
				}
			}
		},
	}
}
