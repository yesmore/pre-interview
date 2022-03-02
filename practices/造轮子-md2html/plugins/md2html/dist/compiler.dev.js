"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('./util'),
    randomKey = _require.randomKey;

var reg_mark = /^(.+?)\s/; // 匹配以空字符串开头，空格结尾的所有字符

var reg_sharp = /^\#/; // 匹配 '#' 符号

var reg_crossbar = /^\-/; // 匹配以横线开头的字符串

var reg_number = /^\d/; // 匹配以数字开头的 有序列表

function createTree(mdArr) {
  var _htmlPool = {};
  var _lastMark = '';
  var _key = 0;
  mdArr.forEach(function (mdFragment) {
    // TODO1: 提取每一行首字符与空格 [2个字符]
    var matched = mdFragment.match(reg_mark); // [ '# ', '#', index: 0, input: '# 这是 test 标题\r', groups: undefined ]

    if (matched) {
      var mark = matched[1];
      var input = matched['input']; // 匹配 #

      if (reg_sharp.test(mark)) {
        var tag = "h".concat(mark.length);
        var tagContent = input.replace(reg_mark, ''); // TODO2: 是否为一组

        if (_lastMark === mark) {
          _htmlPool["".concat(tag, "-").concat(_key)].tags = [].concat(_toConsumableArray(_htmlPool["".concat(tag, "-").concat(_key)].tags), ["<".concat(tag, ">").concat(tagContent, "</").concat(tag, ">")]);
        } else {
          _lastMark = mark;
          _key = randomKey();
          _htmlPool["".concat(tag, "-").concat(_key)] = {
            type: 'single',
            tags: ["<".concat(tag, ">").concat(tagContent, "</").concat(tag, ">")]
          };
        }
      } // 匹配 ul、li


      if (reg_crossbar.test(mark)) {
        var _tag = 'li';

        var _tagContent = input.replace(reg_mark, '');

        if (_lastMark === mark) {
          _htmlPool["ul-".concat(_key)].tags = [].concat(_toConsumableArray(_htmlPool["ul-".concat(_key)].tags), ["<".concat(_tag, ">").concat(_tagContent, "</").concat(_tag, ">")]);
        } else {
          _lastMark = mark;
          _key = randomKey();
          _htmlPool["ul-".concat(_key)] = {
            type: 'wrap',
            tags: ["<".concat(_tag, ">").concat(_tagContent, "</").concat(_tag, ">")]
          };
        }
      } // 匹配 ol li


      if (reg_number.test(mark)) {
        var _tag2 = 'li';

        var _tagContent2 = input.replace(reg_mark, '');

        if (reg_number.test(_lastMark)) {
          _htmlPool["ol-".concat(_key)].tags = [].concat(_toConsumableArray(_htmlPool["ol-".concat(_key)].tags), ["<".concat(_tag2, ">").concat(_tagContent2, "</").concat(_tag2, ">")]);
        } else {
          _lastMark = mark;
          _key = randomKey();
          _htmlPool["ol-".concat(_key)] = {
            type: 'wrap',
            tags: ["<".concat(_tag2, ">").concat(_tagContent2, "</").concat(_tag2, ">")]
          };
        }
      }
    }
  });
  return _htmlPool;
}

function compileHTML(_mdArr) {
  var _htmlPool = createTree(_mdArr);

  var _htmlStr = '';
  var item;

  for (var k in _htmlPool) {
    item = _htmlPool[k];

    if (item.type === 'single') {
      item.tags.forEach(function (tag) {
        _htmlStr += tag;
      });
    } else if (item.type === 'wrap') {
      var _list = "<".concat(k.split('-')[0], ">");

      item.tags.forEach(function (tag) {
        _list += tag;
      });
      _list += "</".concat(k.split('-')[0], ">");
      _htmlStr += _list;
    }
  } // console.log(_htmlStr);


  return _htmlStr;
}

module.exports = {
  compileHTML: compileHTML
};
/** 
 * md转树形结构：
  {
    'h1-lp58cbwxj': { type: 'single', tags: [ '<h1>这是 test 标题</h1>' ] },
    'ul-l0bthqbro': {
      type: 'wrap',
      tags: [
        '<li>这是 ul 列表 1</li>',
        '<li>这是 ul 列表 2</li>',
        '<li>这是 ul 列表 3</li>',
        '<li>这是 ul 列表 4</li>'
      ]
    },
    'h1-p4829ifme': { type: 'single', tags: [ '<h1>这是 test 标题 2</h1>' ] },
    'h2-6d10e5tnw': { type: 'single', tags: [ '<h2>副标题</h2>' ] },
    'ol-3gp67wuec': {
      type: 'wrap',
      tags: [
        '<li>这是 ol 列表 1</li>',
        '<li>这是 ol 列表 2</li>',
        '<li>这是 ol 列表 3</li>',
        '<li>这是 ol 列表 4</li>'
      ]
    }
  }
 * 
 */