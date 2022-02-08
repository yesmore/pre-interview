"use strict";

var _require = require('path'),
    resolve = _require.resolve;

var Md2Html = require('./plugins/md2html');

module.exports = {
  mode: 'development',
  entry: resolve(__dirname, 'src/app.js'),
  // 入口文件
  output: {
    // 输出文件夹
    path: resolve(__dirname, 'dist'),
    filename: "app.js"
  },
  plugins: [// 实例化插件
  new Md2Html({
    template: resolve(__dirname, 'test.md'),
    // 打包文件
    filename: 'test.html' // 生成文件名

  })]
};