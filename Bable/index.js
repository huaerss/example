import fs from "fs";
import babel from '@babel/core'
import presetEnv from '@babel/preset-env'
const code = fs.readFileSync('./arrow.js', 'utf8');
const transformFunction = (t) =>{
      console.log(t)
}
const result = babel.transform(code,{
    //usage 就是按需引入
    //entry 就是就手动引入
    presets: [[presetEnv, {useBuiltIns: 'usage',corejs: 3}]], // 这句话的意思是使用@babel/preset-env这个插件 里面的useBuiltIns属性是usage 也就是按需引入 corejs用来模拟新的特性的代码 3是版本号
})
console.log(result.code)


