/**
 * 执行 create 命令(创建项目)
 */
const Project = require('../src/project')
console.log('create----', 11111111111111111)
module.exports = (projectName = 'xst-project') => {
  const project = new Project({ projectName })
  project.create()
}
