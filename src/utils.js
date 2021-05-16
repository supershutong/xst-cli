const path = require('path')
const fse = require('fse-extra')
const { INJECT_FILES } = require('./constants')

function getRootPath() {
  return path.resolve(__dirname, './..')
}

function getPackageVersion() {
  const version = require(path.join(getRootPath(), 'package.json')).version
  return version
}

function logPackageVersion() {
  const msg = `xst-cli version: ${getPackageVersion()}`
  console.log()
  console.log(msg)
  console.log()
}

function getDirFileName(dir) {
  try {
    const files = fse.readdirSync(dir)
    const filesToCopy = []
    files.forEach(file => {
      if (file.indexOf(INJECT_FILES) > -1) return
      filesToCopy.push(file)
    })
    return filesToCopy
  } catch (e) {
    return []
  }
}

exports.logPackageVersion = logPackageVersion
exports.getPackageVersion = getPackageVersion
exports.getDirFileName = getDirFileName

// module.exports = {
//   getPackageVersion,
//   logPackageVersion,
//   getDirFileName
// }
