"use strict";
import dynamic from './dynamic';

module.exports = function (app) {
	dynamic(app);

	if (process.env.NODE_ENV === 'development') {
		require('./webpack').default(app);
	} else {
		require('../controllers/vue').default(app);
	}
	require('./static')(app);
};
