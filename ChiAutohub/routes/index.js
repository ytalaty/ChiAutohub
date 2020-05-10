var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT dealer_id, package_id, sale_id, package_name, vehicle_id FROM packages WHERE vehicle_id=1 || vehicle_id=4";
	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
			}
		let query = "SELECT advertisement_id, adtitle, adimage FROM advertisement WHERE startdate <= CURRENT_DATE() and enddate >= CURRENT_DATE()"; 
		// execute query
		db.query(query, (err, promos) => {
			if (err) {
				console.log(err);
				res.render('error');
				}
				res.render('index', {allrecs: result, promos: promos });
				});
		});
	});


module.exports = router;
