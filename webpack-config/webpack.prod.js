const webpack = require('webpack');
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin({
  outputFormat: 'humanVerbose',
});
const config = require("./webpack.common");
const static = require("./base-configuration");

config
  .mode("production")
  .devtool("source-map");

config.output
  .path(static.OUTPUT_PATH)
  .filename(static.FILENAME);

// config.optimization
//   .splitChunks(cacheGroups, {
//     styles: {
//       name: 'styles',
//       test: /\.css$/,
//       chunks: 'all',
//       enforce: true
//     }
//   })

config
  .plugin('minicss')
    .use(MiniCssExtractPlugin, [{
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }]);

config
  .plugin('terser')
    .use(TerserJSPlugin, [{
      cache: true,
      parallel: true
    }]);

config
  .plugin('optimize')
    .use(OptimizeCssAssetsPlugin);

/** 文件hash */
config
  .plugin('hash')
    .use(webpack.HashedModuleIdsPlugin, [{
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 4
    }]);

module.exports = smp.wrap(config.toConfig());