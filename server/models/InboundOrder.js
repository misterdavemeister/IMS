var mongoose = require('mongoose');

var inboundOrderSchema = mongoose.Schema({
  orderNumber: {type: Number, unique: true},
  placedBy: {
    firstName: String,
    lastName: String,
    username: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  products: [{
    name: String,
    quantity: Number,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  totalCost: Number
});

var InboundOrder = mongoose.model('InboundOrder', inboundOrderSchema);

//function createDefaultInboundOrders() {
//  InboundOrder.find({}).exec(function(err, collection) {
//    if (err) {console.log(err.toString());}
//    if (collection.length === 0) {
//      InboundOrder.create({
//      });
//    }
//  });
//}
//
//exports.createDefaultInboundOrders= createDefaultInboundOrders;