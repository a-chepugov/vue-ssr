"use strict";
import dynamic from './dynamic';
import vue from '../controllers/vue';

module.exports = function (app) {
	dynamic(app);

	if (process.env.NODE_ENV === 'development') {
		require('./webpack')(app);
	} else {
		require('./static')(app);
		vue(app);
	}
};
