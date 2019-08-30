// 需要保持@babel/env是第一个元素
// babel.legacy中通过 presets[0][1]修改target
const presets = [
  // '@babel/preset-env'
  ['@babel/preset-react'],
  ['@babel/preset-typescript']
]

const plugins = [
  ['@babel/plugin-transform-runtime'],
  ['styled-jsx/babel', {
    sourceMaps: process.env.NODE_ENV === 'development',
  }]
]

module.exports = {
  presets,
  plugins,
  babelrc: false,
}