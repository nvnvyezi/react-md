const Config = require("webpack-chain");
const HappyPack = require('happypack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const static = require("./base-configuration");

const config = new Config();
const devMode = "production" !== process.env.NODE_ENV;

Object.keys(static.ENTRY).forEach(name =>
  config.entry(name).add(static.ENTRY[name])
);

/** rule */
/** eslint */
// config.module
//   .rule('eslint')
//     .test(/\.(jsx?|tsx?)$/)
//     .exclude
//       .add(/node_modules/)
//       .end()
//     .use('prettier')
//       .loader('eslint-loader')
//       .before()
//       .options({
        // fix: true
        // cache: true
      // })

/** js */
config.module
  .rule('js')
    .test(/\.(jsx?|tsx?)$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('happypack')
      .loader('babel-loader')
      // .loader('happypack/loader?id=babel')
      .options({
        ...require('./babel-options')
      })

/** style */
config.module
  .rule('css')
    .test(/\.(c|le)ss$/)
    .use('style')
      .loader(devMode ? 'style-loader' : MiniCssExtractPlugin.loader)
      .end()
    .use('css')
      .loader('css-loader')
      .end()
    .use('less')
      .loader('less-loader')

/** 图片 */
config.module
  .rule('image')
    .test(/\.(png|jpg|gif|svg|webp)/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('url')
      .loader('url-loader')
      .options({
        limit: 8192
      })

/** plugin */
config  
  .plugin('html')
    .use(HtmlWebPackPlugin, [{
      cache: true,
      favicon: static.FAVICON,
      title: static.TITLE,
      template: './public/index.html',
      filename: './index.html',
      inject: true,
      hash: true,
      meta: static.META,
      minify: { collapseWhitespace: true },
      showErrors: true,
      xhtml: true,
    }])

// config
//   .plugin('happy')
//     .use(HappyPack, [{
//       id: 'babel',
//       loaders: ['babel-loader?cacheDirectory'],
//     }])

/** resolve */
/** alias */
Object.keys(static.alias).forEach(name => {
  config.resolve.alias.set(name, static.alias[name])
})

/** 用于描述的 JSON 文件 */
config.resolve
  .descriptionFiles
  .add('package.json')
  
/** 自动解析确定的扩展 */
config.resolve.extensions
  .add('.js')
  .add('.jsx')
  .add('.ts')
  .add('.tsx')
  .add('.json')

config.resolve.mainFields
  .add('jsnext:main')
  .add('browser')
  .add('main')

/** 解析目录时要使用的文件名。 */
config.resolve.mainFiles
  .add('index')

config.resolve.modules
  .add(static.MODULESPATH)
  .add('node_modules')
  
module.exports = config;
