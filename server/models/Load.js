var mongoose = require('mongoose');

var loadSchema = mongoose.Schema({
  loadId: {type:Number, required:'{PATH} is required!', unique: true},
  productName: {type:String, required:'{PATH} is required!'},
  quantity: {type:Number, required:'{PATH} is required!'},
  locationName: {type:String, required:'{PATH} is required!'},
  product: {type:mongoose.Schema.Types.ObjectId, ref:'Product'},
  location: {type:mongoose.Schema.Types.ObjectId, ref:'Location'}
});

var Load = mongoose.model('Load', loadSchema);
