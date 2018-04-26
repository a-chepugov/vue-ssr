"use strict";
const webpack = require('webpack');
module.exports = (params = {}) => new webpack.DefinePlugin(params);
