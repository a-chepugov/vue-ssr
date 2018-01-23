"use strict";
import dynamic from './dynamic';
import vue from '../controllers/vue';

module.exports = function (server) {
	dynamic(server);

	if (process.env.NODE_ENV === 'development') {
		require('./webpack')(server);
	} else {
		require('./static')(server);
		vue(server);
	}
};
