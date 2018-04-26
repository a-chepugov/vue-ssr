"use strict";
const webpack = require('webpack');
module.exports = (options) => new webpack.optimize.SplitChunksPlugin(options);
