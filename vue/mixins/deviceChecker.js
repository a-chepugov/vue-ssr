import {mapMutations} from 'vuex';
import getDevice from '../helpers/getDevice';

export default {
	methods: {
		...mapMutations({
			set: 'device/set',
		}),
	},
	mounted() {
		if (typeof window !== undefined) {
			window.addEventListener('resize', () => this.set(getDevice(window.innerWidth)));
			this.set(getDevice(window.innerWidth));
		}
	}
};

