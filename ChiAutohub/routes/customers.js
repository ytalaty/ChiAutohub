var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('customers/addrec');
});

// ==================================================
// Route Enable Registration
// ==================================================
router.get('/register', function(req, res, next) {
	res.render('customers/addrec');
});


// ==================================================
// Route Provide Login Window
// ==================================================
router.get('/login', function(req, res, next) {
	res.render('customers/login', {message: "Please Login"});
});


// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
  let query = "select customer_id, firstname, lastname, password from customers WHERE username = '" + req.body.username + "'"; 
  // execute query
  db.query(query, (err, result) => {
		if (err) {res.render('error');} 
		else {
			if(result[0])
				{
				// Username was correct. Check if password is correct
				bcrypt.compare(req.body.password, result[0].password, function(err, result1) {
					if(result1) {
						// Password is correct. Set session variables for user.
						var custid = result[0].customer_id;
						req.session.customer_id = custid;
						var custname = result[0].firstname + " "+ result[0].lastname;
						req.session.custname = custname;
						res.redirect('/');
					} else {
						// password do not match
						res.render('customers/login', {message: "Wrong Password"});
					}
				});
				}
			else {res.render('customers/login', {message: "Wrong Username"});}
		} 
 	});
});


// ==================================================
// Route to logout
// ==================================================
router.get('/logout', function(req, res, next) {
	req.session.customer_id = 0;
	req.session.custname = "";
	res.redirect('/');
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

bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.password, salt, (err, hash) => {
			if(err) { res.render('error');}

db.query(insertquery,[req.body.customer_id, req.body.firstname, req.body.lastname, req.body.email, req.body.phone, req.body.address, req.body.city, req.body.state, req.body.zip, req.body.username, hash, req.body.create_date],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/');
			}
		});
		});
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
