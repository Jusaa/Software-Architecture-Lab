var express = require('express');
var router = express.Router();
var userService = require('../public/javascripts/userController');

router.get('/get_all', getAll);
router.post('/authenticate', authenticate);

function authenticate(req, res, next) {
  console.log(req.body)
  userService.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

module.exports = router;
