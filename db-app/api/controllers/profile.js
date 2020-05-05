var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

mongoose.set('useFindAndModify', false);

/* Deletes user from collection */
module.exports.profileDelete = function (req, res) {

  console.log("Deleting user");

  if (!req.body._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
    });
    console.log("Error deleting");
  } else {
    User
      .findByIdAndRemove(req.body._id)
      .exec(function (err, user) {
        res.status(200).json({
          "message": "User has been deleted"
        });
      });
  }
};

/* Updates user from collection */
module.exports.profileUpdate = function (req, res) {

  console.log("Updating user:" + req.body.userName);
  console.log("User First:" + req.body.firstName);
  console.log("User Last:" + req.body.lastName);
  console.log("User ID:" + req.body._id);

  User
    .findByIdAndUpdate(req.body._id, req.body, {
      new: true
    }, function (err, doc) {
      if (err) {
        console.log("Bad");
        res.status(404).json(err);
      } else {
        console.log("Sending okay");
        res.status(200);
        res.json(doc);
        console.log(doc);
      }
    });

};

/* Get the user collection */
module.exports.validUsernameIgnoreSelf = function (req, res) {

  // Ensure that all fields are filled
  if (!req.body.userName) {
    sendJSONresponse(res, 400, {
      "message": "username required"
    });
    return;
  }

  console.log("Checking for valid username, not in use");

  User.findOne({
    userName: req.body.userName
  }, function (err, user) {

    // error checking
    if (err) {
      res.status(404).json(err);
      return;
    }

    // if a user was found return an error message to invalidate field
    if (user && user._id != req.body._id) {
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

/* Get the user collection */
module.exports.userCollection = function (req, res) {
  console.log("Getting user collection");

  User
    .find({})
    .exec(function (err, user) {
      //console.log(user);
      res.status(200).json(user);
    });

};

/* Updates user's password*/
module.exports.changePassword = function (req, res) {

  // Error check
  if (!req.body.userName ||
    !req.body._id ||
    !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  // Test prints
  console.log("Changing user password:" + req.body.userName);
  console.log("User ID:" + req.body._id);
  console.log("New Password: " + req.body.password)
  var salt = crypto.randomBytes(16).toString('hex');
  var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');

  User
    .findByIdAndUpdate(req.body._id, {
      $set: {
        salt: salt,
        hash: hash
      }
    }, {
      new: true
    }, function (err, doc) {
      if (err) {
        console.log("Bad");
        res.status(404).json(err);
      } else {
        console.log("Sending okay");
        res.status(200);
        res.json(doc);
        console.log(doc);
      }
    });

};
