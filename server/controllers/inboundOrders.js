var InboundOrder = require('mongoose').model('InboundOrder');

exports.createInboundOrder = function(req, res) {
  var inboundOrderData = req.body;

  InboundOrder.create(inboundOrderData, function(err, inboundOrder) {
    if (err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(inboundOrder);
  });
};

exports.getInboundOrders = function(req, res) {
  InboundOrder.find({})
              .populate('placedBy.user products.product')
              .exec(function(err, collection) {
                if (err) {
                  res.statusCode(400);
                  res.send({reason:err.toString()});
                }
                res.send(collection);
  });
};
