/*
 * vedi https://github.com/petehunt/webpack-howto
 *
 */

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          ecma: 6
        },
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }});
