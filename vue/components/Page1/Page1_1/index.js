import {mapActions, mapMutations} from 'vuex';

export default {
	data: function () {
		return {}
	},
	computed: {
		...mapMutations({get: 'test/get'}),
		count: {
			get () {
				return this.get
			},
			set (values) {
				return this.set
			}
		},
	},
	methods: {
		...mapActions({set: 'test/set'}),
	},
	async created() {
		return new Promise((resolve, reject) => {
			let _this = this;
			setTimeout(() => {
				_this.count++;
				resolve();
			}, 500)
		})
			.then(() => {
				console.log('DEBUG:index.js():18 =>');
			})
	}
};
