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

exports.createLoad = function(req, res) {
  var loadData = req.body;
  Load.create(loadData, function(err, load) {
    if (err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(load);
  });
};