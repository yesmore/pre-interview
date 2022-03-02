import { randomNum } from '../shared/utils'

const reg_var = /\{\{(.*?)\}\}/g; // 匹配双大括号
const reg_preTag = (node) => { // 匹配开头的tag
  return new RegExp(`\<(.*?)\>${node}\</.*?\>`)
}
const reg_data_dom = /\<.+?\>\{\{(.+?)\}\}\<.+?\>/g
const reg_tag = /\<(.+?)\>/;

let o = 0
export const statePool = []

export function stateFormat(template, state) {

  let _state = {}

  template = template.replace(reg_data_dom, function (node, key) {
    const matched = node.match(reg_tag)
    const _flag = randomNum()

    _state.flag = _flag
    statePool.push(_state)
    _state = {}

    return `<${matched[1]} data-dom='${_flag}'>{{${key}}}</${matched[1]}>`
  })

  return template.replace(reg_var, (node, key) => {
    // console.log(node, key);
    let _var = key.trim()
    const _varArray = _var.split('.');
    let i = 0

    while (i < _varArray.length) {
      _var = state[_varArray[i]]
      i++
    }

    _state.state = _varArray
    statePool[o].state = _varArray
    o++

    return _var
  })
}