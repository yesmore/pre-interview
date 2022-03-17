/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let a = headA, b = headB
  while (a !== b) {
    a = !a ? headA : a.next
    b = !b ? headB : b.next 
  }
  return a
};
// @lc code=end

var getIntersectionNode = function(headA, headB) {
  let data = new Set()
  while (headA) {
    data.add(headA)
    headA = headA.next
  }
  while (headB) {
    if (data.has(headB))
      return headB
    headB = headB.next
  }
  return null
};