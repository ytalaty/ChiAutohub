var express = require('express');
var router = express.Router();


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
	res.render('promotions/addrec');
});


// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function(req, res, next) {
let query = "SELECT promotion_id, promotion_name, promotion_description, vehicle_id, create_date FROM promotions"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('promotions/allrecords', {allrecs: result });
 	});
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid', function(req, res, next) {
let query = "SELECT promotion_id, promotion_name, promotion_description, vehicle_id, create_date FROM promotions WHERE promotion_id = " + req.params.recordid; 

	// execute query
	db.query(query, (err, result) => {
	if (err) {
		console.log(err);
		res.render('error');
	} else {
	res.render('promotions/onerec', {onerec: result[0] });
		} 
	});
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO promotions (promotion_id, promotion_name, promotion_description, vehicle_id, create_date) VALUES (?, ?, ?, ?, ?)"; 

db.query(insertquery,[req.body.promotion_id, req.body.promotion_name, req.body.promotion_description, req.body.vehicle_id, req.body.create_date],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
			res.redirect('/promotions');
			}
		});
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
let query = "SELECT promotion_id, promotion_name, promotion_description, vehicle_id, create_date FROM promotions WHERE promotion_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('promotions/editrec', {rec: result[0] });
		} 
 	});
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
	let updatequery = "UPDATE promotions SET promotion_name = ?, promotion_description = ?, vehicle_id = ?, create_date = ? WHERE promotion_id = " + req.body.promotion_id; 


	db.query(updatequery,[req.body.promotion_name, req.body.promotion_description, req.body.vehicle_id, req.body.create_date],(err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/promotions');
		}
		});
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
let query = "DELETE FROM promotions WHERE promotion_id = " + req.params.recordid;  

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/promotions');
		} 
 	});
});

module.exports = router;
