var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  firstName: { type:String, required:'{PATH} is required!' },
  lastName: { type:String, required:'{PATH} is required!' },
  username: {
    type:String,
    required:'{PATH} is required!',
    unique:true
  },
  salt: { type:String, required:'{PATH} is required!' },
  hashed_pwd: { type:String, required:'{PATH} is required!' },
  roles: { type:[String], default:'user' }
});

userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
  },
  hasRole: function(role) {
    return this.roles.indexOf(role) > -1;
  }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
  User.find({}).exec(function (err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
      var salt, hash;
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'DCole');
      User.create({
        firstName : 'David',
        lastName  : 'Cole',
        username  : 'DCole',
        salt      : salt,
        hashed_pwd: hash,
        roles     : ['user', 'admin']
      }, function(err) {
        if (err) console.log(err.toString());
      });
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'SGray');
      User.create({firstName: 'Susan', lastName: 'Gray', username: 'SGray', salt: salt, hashed_pwd: hash});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'DGole');
      User.create({firstName: 'Dusan', lastName: 'Gole', username: 'DGole', salt: salt, hashed_pwd: hash});
    } else if (collection.length === 1) {
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'SGray');
      User.create({firstName: 'Susan', lastName: 'Gray', username: 'SGray', salt: salt, hashed_pwd: hash});
      salt = encrypt.createSalt();
      hash = encrypt.hashPwd(salt, 'DGole');
      User.create({firstName: 'Dusan', lastName: 'Gole', username: 'DGole', salt: salt, hashed_pwd: hash});
    }
  });
}

exports.createDefaultUsers = createDefaultUsers;
