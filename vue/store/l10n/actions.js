import Vue from 'vue';
import {throttle} from 'lodash';

let bunch = [];

let downloadBunch = (commit) => {
	let payloadRaw = bunch.splice(0, Infinity);
	let payload = payloadRaw.map(({langCode, word}) => {
		return {langCode, word}
	});
	Vue.http.post('/vue/l10n', payload)
		.then(({body} = []) => {
			let result = body.map((item, index) => {
				let {langCode, word} = payloadRaw[index];
				return {langCode, word, value: item}
			});
			commit('setBunch', result);
			payloadRaw.forEach(({then}) => then instanceof Function ? then() : undefined);
		})
};
downloadBunch = throttle(downloadBunch, 15, {leading: false, trailing: true});

export function download(payload, commit) {
	bunch.push(payload);
	downloadBunch(commit)
}
