const saved = {};

export default function (langCode, word) {
	let base = saved[langCode];
	if (!base) {
		try {
			base = {};
			saved[langCode] = base;
		} catch (error) {
			base = {}
		}
	}
	return base[word];
}
