"use strict";
const {modulesForHotReplacement} = require('../store');

module.exports = function (source, meta) {
	try {
		let modulesNames = Object.keys(modulesForHotReplacement);
		let modulesPaths = modulesNames.map(item => `./${item}`);
		return `${JSON.stringify(modulesPaths)},`;
	} catch (error) {
		console.error(error);
		console.error('Ошибка ппри обработке модулей Vue');
	}
};
