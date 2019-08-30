const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = require("./webpack.common");
const static = require('./base-configuration')

config
  .mode("development")
  .devtool("cheap-module-eval-source-map");

config
  .devServer
    /** 压缩 */
    .compress(true)
    .headers(static.HEADERS)
    .host(static.HOST || 'localhost')
    .hot(true)
    // .hotOnly(true)
    .https(static.HTTPS)
    .inline(true)
    .open(static.OPEN)
    .port(static.PORT)
    .progress(true)
    .proxy(static.PROXY)
    .quiet(true)
    .stats(static.STATS || 'minimal')

/** 热更新 */
config
  .plugin('hot')
    .use(webpack.HotModuleReplacementPlugin)

/** 输出控制台信息 */
config
  .plugin('friend')
    .use(FriendlyErrorsWebpackPlugin, [{
      clearConsole: true,
      compilationSuccessInfo:{
        messages: [
          `Project is running at http://localhost:${static.PORT}/`,
        ],
        notes: ['注意']
      },
      onErrors: function(severity, errors) {
        console.log(severity, errors)
      },
    }])


// console.log(config.toConfig());

module.exports = config.toConfig();
