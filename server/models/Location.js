var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String
});

var Location = mongoose.model('Location', locationSchema);

function createDefaultLocation() {
  Location.find({}).exec(function(err, collection) {
    if (err) {console.log(err.toString());}
    if (collection.length === 0) {
      Location.create({name:"Warehouse 1"});
    }
  });
}

exports.createDefaultLocation = createDefaultLocation;
