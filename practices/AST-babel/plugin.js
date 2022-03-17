module.exports = function () {
  return {
    visitor: {
      BinaryExpression(path, state) {
        path.node.operator = state.opts.operator
        console.log(path.node.operator)
        console.log(path.node.left);
        console.log(path.node.right);
      }
    }
  }
}