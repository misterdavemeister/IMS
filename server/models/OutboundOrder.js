var mongoose = require('mongoose');

var outboundOrderSchema = mongoose.Schema({
  orderNumber: {type: Number, unique: true},
  created: {type:Date, default: Date.now},
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
    sequence: String,
    name: String,
    quantity: Number,
    quantityOpen: Number,
    received: {type: Boolean, default: false},
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  }],
  totalCost: Number,
  totalUnits: Number,
  status: String
});

var OutboundOrder = mongoose.model('OutboundOrder', outboundOrderSchema);

function createDefaultOutboundOrder() {
  OutboundOrder.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
      OutboundOrder.create({
        orderNumber: 1991991020
                           });
    }
  });
}

exports.createDefaultOutboundOrder = createDefaultOutboundOrder;
