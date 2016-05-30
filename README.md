## co-prepare-deployment-package

### How to use
```javascript
var path = require('path')
require('co-prepare-deployment-package').pack({
  packageName: 'my-super-depoloyment-pack.zip',
  outDir: path.join(__dirname, 'deployDir'),
  globs: ['my-file.txt', 'my-folder/**/*']
})
```

Run example:
- Go to package dir `cd co-prepare-deployment-package`
- Run example `node example`
- Now your `DEPLOYMENT_PACKAGE.zip` has been created