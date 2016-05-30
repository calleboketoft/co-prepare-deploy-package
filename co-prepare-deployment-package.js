var fileSystem = require('fs')
var archiver = require('archiver')
var path = require('path')

// config = {
//   packageName: 'my-super-depoloyment-pack.zip',
//   outDir: 'deployDir',
//   globs: ['my-file.txt', 'my-folder/**/*']
// }
function pack (config) {
  var packageName = config.packageName || 'PACKAGE.zip'
  var outDir = config.outDir || '/'
  var outDirFull = path.join(__dirname, outDir, packageName)
  var output = fileSystem.createWriteStream(__dirname + outDir + packageName)
  var archive = archiver('zip')

  console.log('Creating ' + packageName)

  output.on('close', () => {
    console.log('Package has been created at:')
    console.log(outDirFull)
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
