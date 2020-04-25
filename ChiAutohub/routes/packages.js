var express = require('express');
var router = express.Router();


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('packages/addrec');
});


// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT dealer_id, package_id, sale_id, package_name, vehicle_id FROM packages"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('packages/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
let query = "SELECT dealer_id, package_id, sale_id, package_name, vehicle_id FROM packages WHERE package_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
	if (err) {
		console.log(err);
		res.render('error');
	} else {
	res.render('packages/onerec', {onerec: result[0] });
		} 
	});
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO packages (dealer_id, package_id, sale_id, package_name, vehicle_id) VALUES (?, ?, ?, ?, ?)"; 

db.query(insertquery,[req.body.dealer_id, req.body.package_id, req.body.sale_id, req.body.package_name, req.body.vehicle_id],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/packages');
			}
		});
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
let query = "SELECT dealer_id, package_id, sale_id, package_name, vehicle_id FROM packages WHERE package_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('packages/editrec', {rec: result[0] });
		} 
 	});
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE packages SET dealer_id = ?, sale_id = ?, package_name = ?, vehicle_id = ? WHERE package_id = " + req.body.package_id; 


	db.query(updatequery,[req.body.dealer_id, req.body.sale_id, req.body.package_name, req.body.vehicle_id],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/packages');
		}
		});
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
let query = "DELETE FROM packages WHERE package_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/packages');
		} 
 	});
});

module.exports = router;
