var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	res.render('reports/reports');
});

router.get('/allcustomers', function(req, res, next) {
let query = "SELECT customer_id, firstname, lastname, email, phone, address, city, state, zip, username, password, create_date FROM customers"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('reports/allcustomers', {allrecs: result });
 	});
});

router.get('/allvehicles', function(req, res, next) {
let query = "SELECT vehicle_id, vehicle_name, vehicle_description, vehicle_amount FROM vehicles"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('reports/allvehicles', {allrecs: result });
 	});
});

router.get('/allsales', function(req, res, next) {
let query = "SELECT dealer_id, customer_id, sale_id, sale_name, sale_amount, sale_description, sale_date, vehicle_id FROM sales"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('reports/allsales', {allrecs: result });
 	});
});

module.exports = router;