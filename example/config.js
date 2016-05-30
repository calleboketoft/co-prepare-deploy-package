var path = require('path')
module.exports =  {
  packageName: 'DEPLOY_PACKAGE.zip',
  outDir: path.join(__dirname, ''),
  globs: ['example/suitcase/muffler.txt', 'example/suitcase/zip-bag/**/*']
}