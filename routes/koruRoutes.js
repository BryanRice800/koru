var express = require('express');
var router = express.Router();

/* GET home page. */

var koruRoutes = function (passport) {
	router.get('/', function(req, res, next) {
  		res.render('index.ejs', { message: 'Express' });
	});
	return router;
}

module.exports = koruRoutes;
