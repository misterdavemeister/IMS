var mongoose = require('mongoose');
var Load = mongoose.model('Load');

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
  var order = loadData.order,
      orderLine = loadData.orderLine,
      product = loadData.product,
      location = loadData.location;

  Load.create(loadData, function(err, load) {
    if (err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
//    console.log("Order:");
//    console.log(order);
//    console.log("Order Line:");
//    console.log(orderLine);
//    console.log("Product:");
//    console.log(product);
//    console.log("Location:");
//    console.log(location);
//    console.log("Load");
//    console.log(load);
    updateProduct(product, load);
    updateOrderLine(orderLine, load);
    updateLocation(location, load);
    //update Product quantity √
    //update Inbound Order open orders √
    //update location to include load id... product... and quantity?
    res.send(load);
  });
};

function updateProduct(product, load) {
  var Product = mongoose.model('Product');
  var quantityToAdd = product.quantity + load.quantity;
  Product.update({_id:product._id}, {
    quantity: quantityToAdd
  }, function(err, numAffected) {
    if (err) {
      console.log(err);
    } else {
      console.log("in updateProduct:");
      console.log(numAffected);
    }
  });
}

function updateOrderLine(orderLine, load) {
  var quantityReceived = load.quantity,
      originalOrderQuantity = orderLine.quantity,
      quantityOpenAfterReceivedQuantity = originalOrderQuantity - quantityReceived,
      received = quantityOpenAfterReceivedQuantity === 0,
      InboundOrder = mongoose.model('InboundOrder');

  InboundOrder.update({"products.sequence":orderLine.sequence}, {
    "products.$.quantityOpen": quantityOpenAfterReceivedQuantity,
    "products.$.received": received
  }, function(err, numAffected) {
    if (err) {
      console.log(err);
    } else {
      console.log('in updateOrderLine:');
      console.log(numAffected);
    }
  })
}

function updateLocation(location, load) {
  //push loads into loads property (replace products property with loads property)
}