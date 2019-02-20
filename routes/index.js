var express = require('express');
var router = express.Router();
var userService = require('../public/javascripts/userController');
var CONFIG = require('../config');

var { Pool, Client }  = require('pg');
var conString = 'postgres://' + CONFIG.user + ':' + CONFIG.password + '@' + CONFIG.address + ':' + CONFIG.port + '/' + CONFIG.database;
var pool = new Pool({
  connectionString: conString
});

// All routes
router.get('/', index);
router.get('/hw', helloWorld);
router.get('/:user_id/list_notes', listNotes);
router.post('/:user_id/add_note', addNote);

// Functions for routes
function index(req, res, next) {
  res.render('index', { title: 'Express' });
}

function helloWorld(req, res, next) {
  res.send('Hello World!');
}

function listNotes(req, res, next) {
  pool.query("SELECT content FROM note WHERE user_id=" + req.params.user_id + ";", (err, res2) => {
    res.send(res2);
    pool.end;
  });
}

function addNote(req, res, next) {
  pool.query("INSERT INTO note (user_id, content) VALUES (" + req.params.user_id + ", " + req.body.content + ");", (err, res2) => {
    res.rend(res2);
    pool.end;
  });
}

module.exports = router;
