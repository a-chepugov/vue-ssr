module.exports = function (vm, langCode, word) {
	// Хитрая костылина для обновления компоненты при асинхронном получении переводов
	let then = () => vm.$forceUpdate();

	vm.$store.dispatch('l10n/fetch', {
		langCode, word, then
	})
};
