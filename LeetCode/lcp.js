var longestCommonPrefix = function(strs) {
 
  let pre = ''
  if (strs.length === 0)    return ''
  if (strs.length === 1)    return strs[0]

  pre = help(strs[0], strs[1])
  if (pre === null){
    return ''
  }
  for (let i = 2; i < strs.length; i++) {
    pre = help(pre,strs[i]);
    if(pre === null){
        return '';
    }
}
return pre;
};
var help = function(s1, s2) {
    let len = Math.min(s1.length, s2.length)
    for (let i=len; i>0; i--){
        let t = s1.substring(0, i)
        if(t === s2.substring(0, i)){
            return t
        }
    }
    return null
}

let strs = ["flower","flow","flight"]
console.log(longestCommonPrefix(strs))