"use strict";
import getTranslate from '../../app/helpers/getTranslate';

module.exports = function (vm, langCode, word) {
	let value = getTranslate(langCode, word);
	vm.$store.commit('l10n/set', {langCode, word, value});
	return value
};
