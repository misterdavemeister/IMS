var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/ims',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    db: 'mongodb://david:ims@ds033915.mongolab.com:33915/ims',
    rootPath: rootPath,
    port: process.env.PORT || 80
  }
};
