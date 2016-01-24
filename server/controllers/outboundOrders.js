var OutboundOrder = require('mongoose').model('OutboundOrder');

exports.getOutboundOrders = function(req, res) {
  OutboundOrder.find({})
               .exec(function(err, collection) {
                 if (err) {
                   res.statusCode(400);
                   res.send({reason:err.toString()});
                 }
                 res.send(collection);
  });
};