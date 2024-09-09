import fs from 'fs'
import babel from '@babel/core'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const filePath = path.join(__dirname, 'arrow.js')

const code = fs.readFileSync(filePath, 'utf8')

const transfromJs = ({ types }) => {
  return {
    name: 'transform-js',
    visitor: {
      // 匹配里面的箭头函数
      ArrowFunctionExpression(path) {
        const node = path.node
        const newNode = types.functionExpression(
          null, // id
          node.params, // params
          types.blockStatement([types.returnStatement(node.body)]), // body
          node.generator, // generator
          node.async, // async
        )
        path.replaceWith(newNode)
      },
    },
  }
}

const result = babel.transform(code, {
  plugins: [transfromJs],
})
console.log(result.code)
