var express = require('express');
var router = express.Router();
var CONFIG = require('../config');

var { Pool, Client }  = require('pg');
var conString = 'postgres://' + CONFIG.user + ':' + CONFIG.password + '@' + CONFIG.address + ':' + CONFIG.port + '/' + CONFIG.database;
console.log(conString);
var pool = new Pool({
  connectionString: conString
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hw', function(req, res, next) {
  res.send('Hello World!');
});

router.get('/employees', function(req, res, next) {
  pool.query("SELECT * FROM employees;", (err, res2) => {
    res.send(res2)
    pool.end;
  });
});

module.exports = router;
