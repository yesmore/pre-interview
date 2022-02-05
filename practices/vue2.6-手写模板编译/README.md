# 模板编译过程

` template -> 编译 ... -> 真实 DOM`

- 1.获取 template
- 2.template -> AST 树
- 3.AST -> render 函数 -> `_c` / `_v` / `_s`
- 4.render 函数 -> 虚拟节点
- 5.设置 PATCH -> 打补丁到真实 DOM

> AST (Abstract syntax tree 抽象语法树): 源代码的抽象语法结构的树状描述。
