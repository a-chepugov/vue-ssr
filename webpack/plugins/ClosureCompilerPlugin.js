// установки по-умолчанию
const ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = function () {
	return new ClosureCompilerPlugin({
		compiler: {
			language_in: 'ECMASCRIPT6',
			language_out: 'ECMASCRIPT5',
			compilation_level: 'SIMPLE'
		},
		concurrency: 5,
	})
}
