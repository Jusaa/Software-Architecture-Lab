var express = require('express');
var router = express.Router();
var userService = require('../public/javascripts/userController');

router.get('/get_all', getAll);
router.post('/authenticate', authenticate);

function authenticate(req, res, next) {
  console.log(req.body)
  userService.authenticate(req.body)
    .then(user => user ? res.redirect("/" + user.user_id + "/list_notes") : res.redirect("/"))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

module.exports = router;
