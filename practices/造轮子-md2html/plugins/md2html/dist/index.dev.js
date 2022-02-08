"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('fs'),
    readFileSync = _require.readFileSync;

var _require2 = require('path'),
    resolve = _require2.resolve;

var _require3 = require('./compiler'),
    compileHTML = _require3.compileHTML;

var INNER_MARK = '<!-- replace -->';

var Md2Html =
/*#__PURE__*/
function () {
  // 构造器初始化
  function Md2Html(_ref) {
    var template = _ref.template,
        filename = _ref.filename;

    _classCallCheck(this, Md2Html);

    if (!template) {
      throw new Error('The config for "template" must be configured!');
    }

    this.template = template;
    this.filename = filename ? filename : 'md.html';
  } // 编译


  _createClass(Md2Html, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.hooks.emit.tap('md2html', function (compilation) {
        // TODO1: 获取资源 src/app.js
        var _assets = compilation.assets; // TODO2: 同步读取 md文件

        var _mdContent = readFileSync(_this.template, 'utf8'); // TODO3: 同步读取 template文件


        var _templateHTML = readFileSync(resolve(__dirname, 'template.html'), 'utf8'); // TODO4: 将 md 内容以行为单位转换为数组元素


        var _mdContentArr = _mdContent.split('\n'); // TODO5: 编译


        var _htmlStr = compileHTML(_mdContentArr); // console.log(_htmlStr)
        // TODO6: template.html中替换test.md编译后内容


        var _finalHTML = _templateHTML.replace(INNER_MARK, _htmlStr); // TODO7: 增加资源


        _assets[_this.filename] = {
          source: function source() {
            return _finalHTML;
          },
          size: function size() {
            return _finalHTML.length;
          }
        };
      });
    }
  }]);

  return Md2Html;
}(); // commonJS规范导出


module.exports = Md2Html;