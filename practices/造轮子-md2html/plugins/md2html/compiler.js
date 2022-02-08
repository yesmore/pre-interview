const {
  randomKey
} = require('./util');

const reg_mark = /^(.+?)\s/ // 匹配以空字符串开头，空格结尾的所有字符
const reg_sharp = /^\#/ // 匹配 '#' 符号
const reg_crossbar = /^\-/ // 匹配以横线开头的字符串
const reg_number = /^\d/ // 匹配以数字开头的 有序列表

function createTree(mdArr) {
  let _htmlPool = {}
  let _lastMark = ''
  let _key = 0

  mdArr.forEach((mdFragment) => {
    // TODO1: 提取每一行首字符与空格 [2个字符]
    const matched = mdFragment.match(reg_mark) // [ '# ', '#', index: 0, input: '# 这是 test 标题\r', groups: undefined ]

    if (matched) {
      const mark = matched[1]
      const input = matched['input']

      // 匹配 #
      if (reg_sharp.test(mark)) {
        const tag = `h${mark.length}`
        const tagContent = input.replace(reg_mark, '')

        // TODO2: 是否为一组
        if (_lastMark === mark) {
          _htmlPool[`${tag}-${_key}`].tags = [..._htmlPool[`${tag}-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark
          _key = randomKey()
          _htmlPool[`${tag}-${_key}`] = {
            type: 'single',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }

      // 匹配 ul、li
      if (reg_crossbar.test(mark)) {
        const tag = 'li'
        const tagContent = input.replace(reg_mark, '')

        if (_lastMark === mark) {
          _htmlPool[`ul-${_key}`].tags = [..._htmlPool[`ul-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark
          _key = randomKey()
          _htmlPool[`ul-${_key}`] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }

      // 匹配 ol li
      if (reg_number.test(mark)) {
        const tag = 'li'
        const tagContent = input.replace(reg_mark, '')

        if (reg_number.test(_lastMark)) {
          _htmlPool[`ol-${_key}`].tags = [..._htmlPool[`ol-${_key}`].tags, `<${tag}>${tagContent}</${tag}>`]
        } else {
          _lastMark = mark
          _key = randomKey()
          _htmlPool[`ol-${_key}`] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
    }
  })
  return _htmlPool
}

function compileHTML(_mdArr) {
  const _htmlPool = createTree(_mdArr)
  let _htmlStr = ''
  let item

  for (let k in _htmlPool) {
    item = _htmlPool[k]

    if (item.type === 'single') {
      item.tags.forEach((tag) => {
        _htmlStr += tag
      })
    } else if (item.type === 'wrap') {
      let _list = `<${k.split('-')[0]}>`
      item.tags.forEach((tag) => {
        _list += tag
      })
      _list += `</${k.split('-')[0]}>`
      _htmlStr += _list
    }
  }
  // console.log(_htmlStr);
  return _htmlStr
}

module.exports = {
  compileHTML
}

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