var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.createUser = function(req, res, next) {
  var userData = req.body;
  console.log(userData);
  userData.salt = encrypt.createSalt();
  userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
  User.create(userData, function(err) {
    if (err) {
      if (err.toString().indexOf('11000') > -1) {
        err = new Error('Duplicate Username');
      }
      res.status(400);
      return res.send({reason:err.toString()});
    }
//    req.logIn(user, function(err) {
//      if (err) {return next(err);}
//    res.send(user);
    res.send(req.user);
//    });
  });
};

exports.getUsers = function(req, res) {
  User.find({}).exec(function(err, collection) {
    res.send(collection);
  });
};

exports.getUserById = function(req, res) {
  User.findOne({_id: req.params.id}).exec(function(user) {
    res.send(user);
  });
};

exports.updateUser = function(req, res) {
  var userUpdates = req.body;

  if (req.user._id != userUpdates._id) {
    if (!req.user.hasRole('admin')) {
      //User making this update is updating an account other than own and is not admin
          res.status(403);
          return res.end();
    }
    // User making this update is an admin and is updating an account other than own
    User.update({_id: userUpdates._id}, userUpdates, function(err, numAffected) {
      if (!err) {
        console.log(numAffected.toString() + " user(s) updated");
        res.send(200);
      } else {
        res.status(400);
        res.send({reason:err.toString()})
      }
    });
  } else {
    //User making this update is updating own account
    req.user.firstName = userUpdates.firstName;
    req.user.lastName  = userUpdates.lastName;
    req.user.username  = userUpdates.username;
    if (userUpdates.password && userUpdates.password.length > 0) {
      req.user.salt = encrypt.createSalt();
      req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userUpdates.password);
    }
    req.user.save(function (err) {
      if (err) {
        res.status(400);
        res.send({reason: err.toString()});
      }
      res.send(req.user);
    })
  }
};

exports.deleteUser = function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if (err) {res.status(400); res.send({reason:err.toString()});}
    res.sendStatus(200);
  });
};