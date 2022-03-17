/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum1 = function (nums, target) {
  const hash = {}
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    if (hash[target - n] !== undefined)
      return [hash[target - n], i]
    hash[n] = i
  }
  return []
};
// @lc code=end

// v1.0
var twoSum2 = function (nums, target) {
  for (var i = 0; i < nums.length; i++) {
    for (var j = 0; j < i; j++) {
      if ((nums[j] + nums[i]) === target) return [i, j]
    }
  }
};

// v2.0
const twoSum = function (nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i]
    if (map.has(diff))
      return [map.get(diff), i]
    map.set(nums[i], i)
  }
};