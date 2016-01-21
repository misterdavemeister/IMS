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
    updateProduct(product, load);
    updateOrderLine(orderLine, load);
    updateOrder(order, product, load);
    updateLocation(location, load);
    res.send(load);
  });
};

function updateProduct(product, load) {
  var Product = mongoose.model('Product');
  var quantityToAdd = product.quantity + load.quantity;
  Product.update({_id:product._id}, {
    quantity: quantityToAdd,
    $push: {"loads": load}
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
      quantityOpenAfterReceivedQuantity = orderLine.quantityOpen - quantityReceived,
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

function updateOrder(order, productObj, load) {
  var orderProducts = order.products,
      amountOpen = 0, orderStatus,
      InboundOrder = mongoose.model('InboundOrder');

  orderProducts.forEach(function(product) {
    console.log("SHOWING PRODUCT IDS");
    console.log("LOOK HERE::::");
    console.log(product.quantity);
    console.log(product.quantityOpen);
    if (productObj._id === product.product._id) {
      console.log("productObj_id === product.product._id");
      amountOpen += (product.quantityOpen - load.quantity);
    } else {
      console.log("load.product._id !== product._id");
      amountOpen += product.quantityOpen;
    }
  });

  console.log("amount open after receive is...");
  console.log(amountOpen);
  orderStatus = amountOpen > 0 ? 'Open' : 'Closed';

  InboundOrder.update({_id:order._id}, {
    status: orderStatus
  }, function(err, numAffected) {
    if (err) {
      console.log(err);
    } else {
      console.log('in updateOrder:');
      console.log(numAffected);
    }
  })
}

function updateLocation(location, load) {
  var Location = mongoose.model('Location');

  Location.update({location_id: location.location_id}, {
    $push: {"loads": load}
  }, function(err, numAffected) {
    if (err) {
      console.log(err);
    } else {
      console.log("in updateLocation:");
      console.log(numAffected);
    }
  })
}
