import {
  parseHTMLToAst
} from './astParser'
import {
  generate
} from './generate'

/**
 * 摸板编译
 * 核心：template -> AST 树 -> render 函数
 * @param {*} html Dom element（#app）
 * @return {*} 
 */
function compileToRenderFunction(html) {
  const ast = parseHTMLToAst(html),
    code = generate(ast),
    render = new Function(`
      with(this) {
        return ${code}
      }
    `)

  // console.log(ast, code);
  // console.log(render);
  return render
}

export {
  compileToRenderFunction
}