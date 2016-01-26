var OutboundOrder = require('mongoose').model('OutboundOrder');

exports.getOutboundOrders = function(req, res) {
  OutboundOrder.find({})
               .exec(function (err, collection) {
                 if (err) {
                   res.statusCode(400);
                   res.send({reason: err.toString()});
                 }
                 res.send(collection);
               });
};
exports.getOrderById = function(req, res) {
  OutboundOrder.findOne({_id: req.params.id}, function(err) {
    if (err) {
      res.sendStatus(400);
      res.send({reason: err.toString()});
    }
    res.sendStatus(200);
  });
};