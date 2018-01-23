let fetchTranslate = require(`./l10n-${TARGET}`);

module.exports = function (word, options = {}) {
	let langCode = this.$store.getters['lang/code'];
	let langCodePrevious = this.$store.getters['lang/codePrevious'];
	let getTranslate = this.$store.getters['l10n/get'];

	let translate = getTranslate(langCode, word, (langCode, word) => {
			return fetchTranslate(this, langCode, word)
		})
		// Да ладно "нет переводов"? Старые покажу =)
		|| getTranslate(langCodePrevious, word)
		|| '';
	translate = translate.trim();

	if (translate.startsWith('((') && translate.split('|').length === 3 && translate.match(/\(\((.+\|.+|.+)\)\)/g)) {
		let translates = /\(\((.+\|.+|.+)\)\)/g.exec(translate)[1].split('|');
		options.$count = '$count' in options ?
			(Number(options.$count) ? Number(options.$count) : 9) : 1;
		let lastNumber = Number(String(options.$count)[String(options.$count).length - 1]);
		switch (true) {
			case(lastNumber === 1):
				translate = translates[0];
				break;
			case(lastNumber > 4):
				translate = translates[2];
				break;
			default:
				translate = translates[1];
				break;
		}
	}
	if (options.$capitalize && translate.length) {
		translate = translate.replace(translate[0], translate[0].toUpperCase());
	}
	if (options.$decapitalize && translate.length) {
		translate = translate.replace(translate[0], translate[0].toLowerCase());
	}
	return translate || `[${word}]`;
};
