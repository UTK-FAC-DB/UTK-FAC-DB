var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {

  // Make sure all fields are filled
  if (!req.body.firstName ||
    !req.body.lastName ||
    !req.body.password ||
    !req.body.userName ||
    !req.body.userRole) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  console.log("Making new user!");

  // Creates token data
  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.userName = req.body.userName;
  user.userRole = req.body.userRole;

  user.donorRegCreatePriv = false;
  user.donorRegEditPriv = false;
  user.donorRegDeletePriv = false;

  user.donorControlCreatePriv = false;
  user.donorControlEditPriv = false;
  user.donorControlDeletePriv = false;

  user.inventoryCreatePriv = false;
  user.inventoryEditPriv = false;
  user.inventoryDeletePriv = false;

  user.donorMetricCreatePriv = false;
  user.donorMetricEditPriv = false;
  user.donorMetricDeletePriv = false;

  user.setPassword(req.body.password);

  // Saves the user to the database
  user.save(function (err) {

    if (err) {
      console.log(err);
      res.status(404).json(err);
      return;
    }

    var token;
    //token = user.generateJwt();
    res.status(200);
    res.json({
      "token": token
    });
  });
};

/* Login method */
module.exports.login = function (req, res) {

  console.log("Trying to log in!!!!!");

  // Ensure that all fields are filled
  if (!req.body.userName || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  // Uses passport to authenticate users from database
  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    console.log("Validating user shit...");
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

/* Checking username method */
module.exports.nameCheck = function (req, res) {

  console.log("Trying to check name!!!!!");

  // Ensure that all fields are filled
  if (!req.body.userName) {
    sendJSONresponse(res, 400, {
      "message": "username required"
    });
    return;
  }

  //a simple if/else to check if email already exists in db
  User.findOne({
    userName: req.body.userName
  }, function (err, user) {

    // error checking
    if (err) {
      res.status(404).json(err);
      return;
    }

    // if a user was found return an error message to invalidate field
    if (user) {
      res.status(401).json(err);
    }
    // If not send a blank token back to allow registeration
    else {
      res.status(200);
      res.json({
        "token": ''
      });
    }
  });
};