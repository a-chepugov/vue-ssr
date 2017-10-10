const webpack = require('webpack');

module.exports = function () {
	return new webpack.optimize.AggressiveSplittingPlugin({
		minSize: 30000, //Byte, split point. Default: 30720
		maxSize: 50000, //Byte, maxsize of per file. Default: 51200
		chunkOverhead: 0, //Default: 0
		entryChunkMultiplicator: 1, //Default: 1
	})
};
