var express = require('express');
var router = express.Router();


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('customers/addrec');
});


// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, password, create_date FROM customers"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('customers/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, password, create_date FROM customers WHERE customer_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
	if (err) {
		console.log(err);
		res.render('error');
	} else {
	res.render('customers/onerec', {onerec: result[0] });
		} 
	});
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO customers (customer_id, firstname, lastname, email, phone, address, city, state, zip, username, password, create_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 

db.query(insertquery,[req.body.customer_id, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.password, req.body.create_date],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/customers');
			}
		});
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, password, create_date FROM customers WHERE customer_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('customers/editrec', {rec: result[0] });
		} 
 	});
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE customers SET firstname = ?, lastname = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, zip = ?, username = ?, password = ?, create_date = ? WHERE customer_id = " + req.body.customer_id; 


	db.query(updatequery,[req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, req.body.password, req.body.create_date],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/customers');
		}
		});
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
let query = "DELETE FROM customers WHERE customer_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/customers');
		} 
 	});
});

module.exports = router;
