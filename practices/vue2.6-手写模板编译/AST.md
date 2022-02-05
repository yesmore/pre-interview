```js
// 源代码
function fn(a, b) {}

// AST树
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Indentifier",
        "name": "fn"
      },
      "params": [
        {
          "type": "Indentifier",
          "name": "a"
        },
        {
          "type": "Indentifier",
          "name": "b"
        },
      ],
      "body": {
        "type": "BlockStatement",
        "body": []
      },
      "generator": false,
      "expression": false,
      "async": false
    }
  ],
  "sourceType": "script"
}
```

同理，HTML 结构也可以转换成 AST 树
