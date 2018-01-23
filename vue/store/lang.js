import _ from 'lodash';
import langs from '../../constants/langs';

export let getCodeByLangId = (id) => {
	return _.result(_.find(langs, {id}), 'code') || 'ru'
};

export let getPrefixByLangId = (id) => _.result(_.find(langs, {id}), 'prefix', '');

export default {
	namespaced: true,
	state: {
		id: undefined,
		idPrevious: undefined,
	},
	mutations: {
		setByCode(state, payload) {
			if (payload) {
				let {id} = _.find(langs, {code: payload}) || {};
				if (id) {
					state.id = id
				}
			}
		},
		set (state, payload) {
			if (payload) {
				state.idPrevious = state.id;
				state.id = payload
			}
		},
	},
	getters: {
		id: ({id}) => id,
		code: ({id}) => getCodeByLangId(id),
		codePrevious: ({idPrevious}) => getCodeByLangId(idPrevious),
		prefix: ({id}) => getPrefixByLangId(id)
	}
}
