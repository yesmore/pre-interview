import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/index.js', // 入口文件
  output: { // 打包
    format: 'umd', // 生成包的格式
    name: 'Yue', // 包名
    file: 'dist/umd/yue.js', // 打包后的文件名
    sourceMap: true, // 是否生成sourceMap
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    serve({
      open: true, // 是否自动打开浏览器
      port: 3000, // 端口号
      contentBase: '', // 根目录
      openPage: '/index.html', // 打开的页面
    }),
    commonjs() // import xxx from xxx/index.js -> import xxx from xxx
  ]
}