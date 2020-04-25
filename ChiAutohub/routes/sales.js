var express = require('express');
var router = express.Router();


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('sales/addrec');
});


// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT dealer_id, customer_id, sale_id, sale_name, sale_amount, sale_description, sale_date, vehicle_id FROM sales"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('sales/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
let query = "SELECT dealer_id, customer_id, sale_id, sale_name, sale_amount, sale_description, sale_date, vehicle_id FROM sales WHERE sale_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
	if (err) {
		console.log(err);
		res.render('error');
	} else {
	res.render('sales/onerec', {onerec: result[0] });
		} 
	});
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO sales(dealer_id, customer_id, sale_id, sale_name, sale_amount, sale_description, sale_date, vehicle_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; 

db.query(insertquery,[req.body.dealer_id, req.body.customer_id, req.body.sale_id, req.body.sale_name, req.body.sale_amount, req.body.sale_description, req.body.sale_date, req.body.vehicle_id],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/sales');
			}
		});
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
let query = "SELECT dealer_id, customer_id, sale_id, sale_name, sale_amount, sale_description, sale_date, vehicle_id FROM sales WHERE sale_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('sales/editrec', {rec: result[0] });
		} 
 	});
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE sales SET dealer_id = ?, customer_id = ?, sale_name = ?, sale_amount = ?, sale_description = ?, sale_date = ?, vehicle_id = ? WHERE sale_id = " + req.body.sale_id; 


	db.query(updatequery,[req.body.dealer_id, req.body.customer_id, req.body.sale_name, req.body.sale_amount, req.body.sale_description, req.body.sale_date, req.body.vehicle_id],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/sales');
		}
		});
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
let query = "DELETE FROM sales WHERE sale_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/sales');
		} 
 	});
});

module.exports = router;
