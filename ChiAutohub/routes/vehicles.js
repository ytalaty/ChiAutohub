var express = require('express');
var router = express.Router();


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('vehicles/addrec');
});


// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT vehicle_id, vehicle_name, vehicle_description, vehicle_amount FROM vehicles"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('vehicles/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
let query = "SELECT vehicle_id, vehicle_name, vehicle_description, vehicle_amount FROM vehicles WHERE vehicle_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
	if (err) {
		console.log(err);
		res.render('error');
	} else {
	res.render('vehicles/onerec', {onerec: result[0] });
		} 
	});
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO vehicles (vehicle_id, vehicle_name, vehicle_description, vehicle_amount) VALUES (?, ?, ?, ?)"; 

db.query(insertquery,[req.body.vehicle_id, req.body.vehicle_name, req.body.vehicle_description, req.body.vehicle_amount],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/vehicles');
			}
		});
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
let query = "SELECT vehicle_id, vehicle_name, vehicle_description, vehicle_amount FROM vehicles WHERE vehicle_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('vehicles/editrec', {rec: result[0] });
		} 
 	});
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE vehicles SET vehicle_name = ?, vehicle_description = ?, vehicle_amount = ? WHERE vehicle_id = " + req.body.vehicle_id; 


	db.query(updatequery,[req.body.vehicle_name, req.body.vehicle_description, req.body.vehicle_amount],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/vehicles');
		}
		});
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
let query = "DELETE FROM vehicles WHERE vehicle_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/vehicles');
		} 
 	});
});

module.exports = router;
