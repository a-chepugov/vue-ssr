import {download} from './actions';
import langs from '../../../constants/langs';

export default {
	namespaced: true,
	state: langs.reduce((result, {code}) => {
		result[code] = {};
		return result
	}, {}),
	mutations: {
		set (state, payload) {
			if (payload) {
				let {langCode, word, value} = payload;
				state[langCode][word] = value;
			}
		},
		setBunch(state, payload = []) {
			let l = payload.length;
			for (let i = 0; i < l; i++) {
				let {langCode, word, value} = payload[i];
				state[langCode][word] = value;
			}
		},
	},
	getters: {
		get: (state) => (langCode, word, absenceHandler) => {
			let {[langCode]: {[word]: value} = {}} = state;
			if (!value && absenceHandler instanceof Function) {
				return absenceHandler(langCode, word);
			}
			return value
		}
	},
	actions: {
		fetch({commit}, payload) {
			download(payload, commit)
		},
	}
}
