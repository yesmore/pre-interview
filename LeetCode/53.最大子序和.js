/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  return helper(nums, 0, nums.length - 1);
};
function helper(list, m, n) {
  if (m === n) return list[m];
  let sum = 0;
  let lmax = -Number.MAX_VALUE;
  let rmax = -Number.MAX_VALUE;
  const mid = ((n - m) >> 1) + m;
    
  const l = helper(list, m, mid);
  const r = helper(list, mid + 1, n);
  for (let i = mid; i >= m; i--) {
    sum += list[i];
    if (sum > lmax) lmax = sum;
  }

  sum = 0;

  for (let i = mid + 1; i <= n; i++) {
    sum += list[i];
    if (sum > rmax) rmax = sum;
  }

  return Math.max(l, r, lmax + rmax);
}
// @lc code=end

var prev = 0;
var max = -Number.MAX_VALUE;

for (var i = 0; i < nums.length; i++) {
  prev = Math.max(prev + nums[i], nums[i]);
  max = Math.max(max, prev);
}
return max;


var maxSubArray = function(nums) {
  const len = nums.length;
  let max = -Number.MAX_VALUE;
  let sum = 0;

  for (let i = 0; i < len; i++) {
    sum = 0;
    for (let j = i; j < len; j++) {
      sum += nums[j];
      max = Math.max(max, sum)
      // if (sum > max) {
      //   max = sum;
      // }
    }
  }
  return max;
};