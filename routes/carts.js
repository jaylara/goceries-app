const DB = require('../models');

//Selects one cart by parameter id from specified DB.Cart
function selectCart(req, res) {
	DB.Cart.findOne({_id: req.params.id})
	.populate('items')
	.exec((err, fCart) => {
		res.json(fCart);
	});
}//end of selectCart()

//Selects all carts from specified DB.Cart
function selectAllCarts(req, res) {
	DB.Cart.find()
	.populate('items')
	.exec((err, carts) => { // send all users as JSON response
		if (err) { return console.log("index error: " + err); }
		res.json(carts);
	});
}//end of selectAllCarts()

//Creates a simple cart. create cart into the specified DB.Cart
function createCart(req, res) {
	(new DB.Cart(req.body)).save((err, newCart) => {
		res.json(newCart);
	});
}//end of createCart()

//Updates one cart by parameter id from specified DB.Cart
function updateCart(req, res) {
	DB.Cart.update({_id: req.params.id}, {$set: req.body}, {new:true}, (err, uCart) => {
		if (err) { return console.log("index error: " + err); }
		res.json(uCart);
	});
}//end of updateCart()

//Deletes one cart by parameter id from specified DB.Cart
function deleteCart(req, res) {
	DB.Cart.findOneAndRemove({ _id: req.params.id }).exec((err, dCart) => {
		res.json(dCart);
	});
}//end of deleteCart()

module.exports = {
	selectAllCarts : selectAllCarts,
	selectCart : selectCart,
	createCart : createCart,
	updateCart : updateCart,
	deleteCart : deleteCart
};
