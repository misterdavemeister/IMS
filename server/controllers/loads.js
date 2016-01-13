var Load = require('mongoose').model('Load');

exports.getLoads = function(req, res) {
  Load.find({})
      .populate('product location')
      .exec(function(err, collection) {
    if (err) {
      res.status(400);
      res.send({reason:err.toString()});
    }
    res.send(collection);
  });
};