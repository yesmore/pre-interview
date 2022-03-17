/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  let num = digits.join('')
  let num2arr = String(++num).split('').map(Number)
  return num2arr
};
// @lc code=end

/**
 * @param {number[]} digits
 * @return {number[]}
 */
 var plusOne = function (digits) {
  var carry = 1; // 我们将初始的 +1 也当做是一个在个位的 carry
  for (var i = digits.length - 1; i > -1; i--) {
    if (carry) {
      var sum = carry + digits[i];
      digits[i] = sum % 10;
      carry = sum > 9 ? 1 : 0; // 每次计算都会更新下一步需要用到的 carry
    }
  }
  if (carry === 1) {
    digits.unshift(1); // 如果carry最后停留在1，说明有需要额外的一个长度 所以我们就在首位增添一个 1
  }
  return digits;
};

var plusOne = function(digits) {
  let last = digits.length - 1

  for (let i = last; i >= 0; i--) {
    digits[i]++
    if (digits[i] > 9){
      digits[i] = 0
    } else  {
      return digits
    } 
  }
  digits.unshift(1)
  return digits
};