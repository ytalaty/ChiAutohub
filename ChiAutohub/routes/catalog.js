var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	let query = "SELECT vehicle_id, vehicle_name, vehicle_description, vehicle_amount FROM vehicles"; 

	// execute query
	db.query(query, (err, result) => {
			if (err) {
				console.log(err);
				res.render('error');
				}
			res.render('catalog', {catalog: result });
			});

});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post('/add', function(req, res, next) {
	if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
		if (req.session.cart.includes(req.body.vehicle_id))
			{
				// Item Exists in Basket - Increase Quantity 
				var n = req.session.cart.indexOf(req.body.vehicle_id);
				req.session.qty[n] = parseInt(req.session.qty[n]) + parseInt(req.body.qty);
			}
		else
			{
				// Item Being Added First Time
				req.session.cart.push(req.body.vehicle_id);
				req.session.qty.push(req.body.qty);
			}
	}else {
		var cart = [];
		cart.push(req.body.vehicle_id);
		req.session.cart = cart;
		
		var qty = [];
		qty.push(req.body.qty);
		req.session.qty = qty;
	}
  res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
	if (!Array.isArray(req.session.cart) || !req.session.cart.length){
		res.render('cart', {cartitems: 0 });
	} else {	
		let query = "SELECT vehicle_id, vehicle_name, vehicle_description, vehicle_amount FROM vehicles WHERE vehicle_id IN (" + req.session.cart + ")";

		// execute query
		db.query(query, (err, result) => {
			if (err) {res.render('error');} else  
					{res.render('cart', {cartitems: result, qtys: req.session.qty  });}
		});
	}
});


// ==================================================
// Route to remove an item from the cart
// ==================================================
router.post('/remove', function(req, res, next) {
  	// Find the element index of the package_id that needs to be removed
	var n = req.session.cart.indexOf(req.body.vehicle_id);
	
	// Remove element from cart and quantity arrays
	req.session.cart.splice(n,1);
	req.session.qty.splice(n,1);

   	res.redirect('/catalog/cart');

});


// ==================================================
// Route save cart items to SALES table
// ==================================================
router.get('/checkout', function(req, res, next) {
	// Check to make sure the customer has logged-in
	if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id ) {
		// Save SALES Record:
		// sale_amount giving hard time
		// vehicle_id giving hard time
		let insertquery = "INSERT INTO sales(dealer_id, customer_id, sale_name, sale_amount, sale_description, sale_date, vehicle_id) VALUES (1, ?, 'New Sale', 999 , 'New Sale for new Customer', now(), 5)"; 
		db.query(insertquery,[req.session.customer_id],(err, result) => {
			if (err) {
				console.log(err);
				res.render('error');
			} else {
				// Obtain the order_id value of the newly created SALES Record
				var order_id = result.insertId;
				req.session.cart = [];
				// Display confirmation page
				res.render('checkout', {ordernum: order_id });
				}		
			});
	}
	else {
		// Prompt customer to login
		res.redirect('/customers/login');
	}
});


module.exports = router;
