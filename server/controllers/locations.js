var Location = require('mongoose').model('Location');

exports.getLocations = function(req, res) {
  Location.find({}).exec(function(err, collection) {
    if (err) {
      res.status(400);
      res.send({reason:err.toString()});
    }
    res.send(collection);
  })
};
