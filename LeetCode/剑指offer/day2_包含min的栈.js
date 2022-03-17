/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.s = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.s.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  return this.s.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  if (this.s.length) {
    return this.s[this.s.length - 1]
  }
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return Math.min(...this.s)
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */

var minStack = new MinStack()
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.s);
console.log(minStack.min()); // -3
console.log(minStack.s);
console.log(minStack.pop()); // -3
console.log(minStack.s);
console.log(minStack.top()); // 0
console.log(minStack.min()); // -2