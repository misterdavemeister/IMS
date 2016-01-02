var Product = require('mongoose').model('Product');

exports.createProduct = function(req, res) {
  var productData = req.body;
  console.log(productData);
  Product.create(productData, function(err, product) {
    if (err) {
      res.status(400);
      return res.send({reason:err.toString()});
    }
    res.send(product);
  });
};

exports.getProducts = function(req, res) {
  Product.find({}).exec(function(err, collection) {
      res.send(collection);
  });
};

exports.getProductById = function(req, res) {
  Product.findOne({_id: req.params.id}, function(err) {
    if (err) {res.sendStatus(400); res.send({reason:err.toString()});}
    res.sendStatus(200);
  })
};

exports.updateProduct = function(req, res) {
  var productUpdates = req.body;
  if (!req.user.hasRole('admin')) { res.status(403); return res.end(); }
  console.log(req.body);
  Product.update({_id: productUpdates._id}, productUpdates, function(err, numAffected) {
    if (!err) {
      console.log(numAffected.toString() + " product(s) updated");
      res.send(200);
    } else {
      res.status(400);
      res.send({reason:err.toString()})
    }
  });
};

exports.deleteProduct = function(req, res) {
  Product.remove({_id: req.params.id}, function(err) {
    if (err) {res.status(400); res.send({reason:res.toString()});}
    res.sendStatus(200);
  })
};