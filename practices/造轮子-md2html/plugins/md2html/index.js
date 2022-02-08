const {
  readFileSync
} = require('fs')
const {
  resolve
} = require('path')

const {
  compileHTML
} = require('./compiler')
const INNER_MARK = '<!-- replace -->'

class Md2Html {
  // 构造器初始化
  constructor({
    template,
    filename
  }) {
    if (!template) {
      throw new Error('The config for "template" must be configured!')
    }
    this.template = template
    this.filename = filename ? filename : 'md.html'
  }

  // 编译
  apply(compiler) {
    compiler.hooks.emit.tap('md2html', (compilation) => {
      // TODO1: 获取资源 src/app.js
      const _assets = compilation.assets
      // TODO2: 同步读取 md文件
      const _mdContent = readFileSync(this.template, 'utf8')
      // TODO3: 同步读取 template文件
      const _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf8')
      // TODO4: 将 md 内容以行为单位转换为数组元素
      const _mdContentArr = _mdContent.split('\n')
      // TODO5: 编译
      const _htmlStr = compileHTML(_mdContentArr)
      // console.log(_htmlStr)

      // TODO6: template.html中替换test.md编译后内容
      const _finalHTML = _templateHTML.replace(INNER_MARK, _htmlStr)

      // TODO7: 增加资源
      _assets[this.filename] = {
        source() {
          return _finalHTML
        },
        size() {
          return _finalHTML.length
        }
      }
    })
  }
}

// commonJS规范导出
module.exports = Md2Html;