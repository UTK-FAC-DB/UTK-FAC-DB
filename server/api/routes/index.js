var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');

// profile getters
//router.get('/userCollection', auth, ctrlProfile.userCollection);
router.get('/userCollection', auth, ctrlProfile.userCollection);
router.put('/updateUser', ctrlProfile.profileUpdate);
router.post('/deleteUser', ctrlProfile.profileDelete);
router.put('/changePassword', ctrlProfile.changePassword);
router.post('/checkUsernamePost', ctrlProfile.validUsernameIgnoreSelf);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/nameCheck', ctrlAuth.nameCheck);

module.exports = router;
