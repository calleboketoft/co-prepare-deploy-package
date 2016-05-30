var fileSystem = require('fs')
var archiver = require('archiver')
var path = require('path')

function pack (config) {
  var packageName = config.packageName || 'PACKAGE.zip'
  if (!config.outDir) {
    console.log('outDir missing!')
    return
  }
  var fullOutDir = path.join(config.outDir, packageName)
  var output = fileSystem.createWriteStream(fullOutDir)
  var archive = archiver('zip')

  console.log('Creating ' + packageName)

  output.on('close', () => {
    console.log('Package has been created at:')
    console.log(fullOutDir)
    console.log('Package size: ' + archive.pointer() + ' total bytes')
  })

  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(output)

  config.globs.forEach((globStr) => {
    archive.glob(globStr, null, { stats: null })
  })

  archive.finalize()

  // Ignoring stuff would look like this:
  // .glob('build/**/*', {ignore: 'build/skipdir/**/*', nodir: true, stat: false}, { stats: null })
}

module.exports = {
  pack
}
