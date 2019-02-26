var express = require('express');
var router = express.Router();
var CONFIG = require('../config');

var { Pool, Client }  = require('pg');
var conString = 'postgres://' + CONFIG.user + ':' + CONFIG.password + '@' + CONFIG.address + ':' + CONFIG.port + '/' + CONFIG.database;
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

router.get('/list_users', function(req, res, next) {
  pool.query("SELECT username FROM client;", (err, res2) => {
    res.send(res2);
    pool.end;
  });
});

router.get('/:user_id/list_notes', function(req, res, next) {
  pool.query("SELECT content FROM note WHERE user_id=" + req.params.user_id + ";", (err, res2) => {
    res.send(res2);
    pool.end;
  });
});

router.post('/:user_id/add_note', function(req, res, next) {
  pool.query("INSERT INTO note (user_id, content) VALUES (" + req.params.user_id + ", " + req.body.content + ");", (err, res2) => {
    res.rend(res2);
    pool.end;
  });
});

module.exports = router;
