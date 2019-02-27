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
router.post('/:user_id/remove_note/:note_id', removeNote);

// Functions for routes
function index(req, res, next) {
  res.render('index', { title: 'Note Service Demo' });
}

function helloWorld(req, res, next) {
  res.send('Hello World!');
}

function listNotes(req, res, next) {
  pool.query("SELECT note_id, content FROM note WHERE user_id=" + req.params.user_id + ";", (err, res2) => {
    res.render('notes', { title: 'Welcome to your notes', noteList: res2.rows, user_id: req.params.user_id });
    pool.end;
  });
}

function addNote(req, res, next) {
  pool.query("INSERT INTO note (user_id, content) VALUES (" + req.params.user_id + ", '" + req.body.content + "');", (err, res2) => {
    res.redirect("/" + req.params.user_id + "/list_notes");
    pool.end;
  });
}

function removeNote(req, res, next) {
  pool.query("DELETE FROM note WHERE note_id=" + req.params.note_id + ";", (err, res2) => {
    res.redirect("/" + req.params.user_id + "/list_notes");
    pool.end;
  });
}

module.exports = router;
