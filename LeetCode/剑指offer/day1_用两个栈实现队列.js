// 思路是进队列永远从a栈进入
// 出队列永远从b栈出，只有b栈没有了就从a栈中轮流倒腾到b
// 总之出队列一定是从b栈出

var CQueue = function () {
  this.stackA = [];
  this.stackB = [];
};

CQueue.prototype.appendTail = function (value) {
  this.stackA.push(value);
};

CQueue.prototype.deleteHead = function () {
  if (this.stackA.length === 0 && this.stackB.length === 0) return -1;

  if (!this.stackB.length) {
    while (this.stackA.length) {
      this.stackB.push(this.stackA.pop());
    }
  }
  return this.stackB.pop();
}