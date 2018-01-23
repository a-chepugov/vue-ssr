import {mapMutations} from 'vuex'

export default {
	methods: {
		...mapMutations({
			setLangByCode: 'lang/setByCode'
		})
	},
	watch: {
		$route(to) {
			let {meta: {langCode = 'ru'} = {}} = to;
			this.setLangByCode(langCode);
		}
	}
}
