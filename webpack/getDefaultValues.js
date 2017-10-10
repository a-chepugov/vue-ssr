// установки по-умолчанию
const DEVELOPMENT = 'development';
const TESTING = 'testing';
const PRODUCTION = 'production';

module.exports = function (env = {}) {
	const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
	const isDevelopment = NODE_ENV === DEVELOPMENT;
	const isTesting = NODE_ENV === TESTING;
	const isProduction = NODE_ENV === PRODUCTION;

	return {
		NODE_ENV,
		DEVELOPMENT,
		TESTING,
		PRODUCTION,
		isDevelopment,
		isTesting,
		isProduction,
	}
};
