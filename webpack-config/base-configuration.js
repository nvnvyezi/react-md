const path = require("path");

const devMode = "production" !== process.env.NODE_ENV;

function resolve(pathStr) {
  return path.resolve(__dirname, pathStr);
}

/** 别名 */
const alias = {
  '@': resolve('../src/')
}

const devServer = {
  /**
   * 在所有响应中添加首部内容：
   * {'X-Custom-Foo': 'bar'} 
   */
  HEADERS: {},
  /** 指定使用一个 host。默认是 localhost */
  HOST: '',
  /** 
   * 可以选择带有 HTTPS 的 HTTP/2 提供服务
   * true 或者
   * {
   *   key: fs.readFileSync('/path/to/server.key'),
   *   cert: fs.readFileSync('/path/to/server.crt'),
   *   ca: fs.readFileSync('/path/to/ca.pem'),
   * }
   */
  HTTPS: {},
  /** 是否自动打开页面 */
  OPEN: false,
  PORT: 8000,
  /** 设置代理 
   * {
   *   '/api': 'http://localhost:3000'
   * }
   * 或者
   * {
   *   '/api': {
   *     target: 'http://localhost:3000',
   *     pathRewrite: {'^/api' : ''}
   *   }
   * }
   */
  PROXY: {},
  /** 精确控制要显示的 bundle 信息  */
  STATS: 'minimal',
}

const htmlWebPackPlugin = {
  /** favicon路径 */
  FAVICON: '',
  /** 网页title */
  TITLE: 'nvnvyezi',
  /** 添加meta标签 */
  META: {},
}

module.exports = {
  ENTRY: {
    main: resolve("../src")
  },
  FILENAME: devMode ? "js/[name].[hash:8].js" : "js/[name].[chunkhash:8].js",
  OUTPUT_PATH: resolve("../dist/page"),
  PUBLICPATH: devMode ? "/" : "./",
  /** resolve modules 路径 */
  MODULESPATH: resolve('../src/'),
  /** prettier eslint自动格式化的文件 */
  ESLINTPATH: resolve('../src/'),
  alias,
  ...devServer,
  ...htmlWebPackPlugin
};
