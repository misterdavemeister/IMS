var mongoose = require('mongoose');

var inboundOrderSchema = mongoose.Schema({
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

var InboundOrder = mongoose.model('InboundOrder', inboundOrderSchema);
