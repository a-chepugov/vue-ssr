module.exports = function (isProduction) {
	return {
		test: /\.rs$/,
		use: [{
			loader: 'wasm-loader'
		}, {
			loader: 'rust-native-wasm-loader',
			options: {
				release: isProduction
			}
		}]
	}
};


