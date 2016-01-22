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

exports.updateInboundOrder = function(req, res) {
  var inboundUpdates = req.body;
  InboundOrder.update({_id: inboundUpdates._id}, inboundUpdates, function(err, numAffected) {
    if (!err) {
      console.log(numAffected.toString() + " orders affected");
      res.send();
    } else {
      res.status(400);
      res.send({reason:err.toString()});
    }
  });
};

exports.getOrderById = function(req, res) {
  InboundOrder.findOne({_id: req.params.id}, function(err) {
    if (err) {res.sendStatus(400); res.send({reason:err.toString()});}
    res.sendStatus(200);
  })
};

exports.deleteInboundOrder = function(req, res) {
  InboundOrder.remove({_id:req.params.id}, function(err) {
    if (err) {res.status(400); res.send({reason:res.toString()});}
    res.sendStatus(200);
  });
};
