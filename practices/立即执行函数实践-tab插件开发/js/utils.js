var tools = (function () {

  // 正则匹配替换‘{{}}’里的内容
  function tplReplace(template, replaceObj) {
    return template.replace(/\{\{(.*?)\}\}/g, function (node, key) {
      return replaceObj[key.trim()];
    })
  }
  return {
    tplReplace: tplReplace
  }
})();