/** 入口文件
 * 任务：解析命令
 */
console.log('main-----------')
const program = require('commander') // 实现Nodejs命令行
const path = require('path')
const { getPackageVersion } = require('./utils')
const version = getPackageVersion()

const mapAction = {
  // 指令集
  create: {
    // 示例指令
    alias: 'c',
    description: 'create a project',
    examples: ['xst-cli create <project-name>']
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}

Reflect.ownKeys(mapAction).forEach(action => {
  program
    .command(action) // 执行命令
    .alias(mapAction[action].alias) // 执行别名
    .description(mapAction[action].description) // 输出描述
    .action(() => {
      // 命令操作
      if (action === '*') {
        // 命令不存在
        console.log(mapAction[action].description)
      } else {
        // 引入命令对应模块
        require(path.resolve(__dirname, action))(...process.argv.slice(3))
      }
    })
})

// help命令打印帮助信息
program.on('--help', () => {
  console.log('\nExample')
  Reflect.ownKeys(mapAction).forEach(action => {
    mapAction[action].examples.forEach(item => {
      console.log(item)
    })
  })
})

// process.argv：用户在命令行中传入的参数
program.version(version).parse(process.argv)
