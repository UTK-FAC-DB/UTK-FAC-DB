var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // Make sure all fields are filled
  if(!req.body.firstName || 
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

  // Creates token data and saves it
  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.userName = req.body.userName;
  user.userRole = req.body.userRole;
  
  user.setPassword(req.body.password);

  user.save(function(err) {

    if(err) {
      console.log(err);
      res.status(404).json(err);
      return;
    }

    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

  console.log("Made the token!")

  // Saves user to database

};

module.exports.login = function(req, res) {

  console.log("Trying to log in!!!!!");

  // Ensure that all fields are filled
  if(!req.body.userName || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
   return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    console.log("Validating user shit...");
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};