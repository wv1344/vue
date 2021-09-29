import babel from 'rollup-plugin-babel'

export default  {
  input: './src/index.js',
  output: {
    file: 'dist/vue.js', // 打包出的文件结果
    // 常见模块规范，
    // ESmodule   import export
    // commonjs   module.exports  require  


    // umd   兼容 amd 和 cmd
    format: 'umd',
    name: 'Vue',
    sourcemap: true,
  },
  plugins:[ 
    babel({
      exclude:'./node_modules/**'
    })
  ]
}