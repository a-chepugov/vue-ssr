import Vue from "vue";
import Vuex from "vuex";

import device from "./device";
import lang from "./lang";
import l10n from "./l10n";

Vue.use(Vuex);

export default function () {
	return new Vuex.Store({
		modules: {
			device,
			lang,
			l10n,
		}
	});
}
