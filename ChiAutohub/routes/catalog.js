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
router.get('/:vehicid/add', function(req, res, next) {
   cart.push(req.params.vehicid);
   res.redirect('/catalog');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
   res.render('cart');
});

// ==================================================
// Route to remove an item from the cart
// ==================================================
router.get('/:itemid/remove', function(req, res, next) {
   cart.splice(req.params.itemid,1);
   res.render('cart');
   
});

module.exports = router;
