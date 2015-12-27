var Product = require('mongoose').model('Product');

exports.getProducts = function(req, res) {
  Product.find({}).exec(function(err, collection) {
      res.send(collection);
  });
};

exports.createProduct = function(req, res, next) {
  var productData = req.body;

  Product.create(productData, function(err, product) {
    if (err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
  });
};

exports.updateProduct = function(req, res) {
  var productUpdates = req.body;
  if (!req.user.hasRole('admin')) { res.status(403); return res.end(); }
  console.log(req.body);
  Product.update({_id: productUpdates._id}, productUpdates, function() {
    res.send(200);
  });
};

exports.deleteProduct = function(req, res) {

};

exports.getProductById = function(req, res) {
  Product.findOne({_id: req.params.id}, function(err) {
    if (err) {res.sendStatus(400); res.send({reason:err.toString()});}
    res.sendStatus(200);
  })
};