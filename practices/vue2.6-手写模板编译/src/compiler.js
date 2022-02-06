/**
 * 摸板编译
 * 核心：template -> AST 树 -> render 函数
 * @param {*} html Dom element（#app）
 * @return {*} 
 */
function compileToRenderFunction(html) {
  const ast = parseHTML(html)
  return generate(ast)
}

export {
  compileToRenderFunction
}