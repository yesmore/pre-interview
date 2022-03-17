/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  while (s.includes("[]") || s.includes("()") || s.includes("{}")) {
    s = s.replace("[]", "").replace("()", "").replace("{}", "");
  }
  s = s.replace("[]", "").replace("()", "").replace("{}", "");
  return s.length === 0;
};
// @lc code=end



// const isValid = function(s) {
//   const stack = []
//   for (let i = 0; i < s.length; i++) {
//     const c = s[i]
//     switch (c) {
//       case '(':
//         stack.push(')')
//         break
//       case '{': 
//         stack.push('}')
//         break
//       case '[': 
//         stack.push(']')
//         break
//       default:
//         if (c !== stack.pop()) {
//             return false;
//         }
//     }
//   }
//   return stack.length === 0;
// };

var isValid = function(s) {
  const stack = [], 
  map = {
    "(":")",
    "{":"}",
    "[":"]"
  };
  for(const x of s) {
      if(x in map) {
          stack.push(x);
          console.log('入栈：'+x)
          continue;
      };
      console.log('出栈：'+x)
      if(map[stack.pop()] !== x) return false;
  }
  return !stack.length;
};


console.log(isValid('({})'))