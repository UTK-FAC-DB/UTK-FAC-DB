var mongoose = require('mongoose');
var User = mongoose.model('User');

mongoose.set('useFindAndModify', false);

/* Deletes user from collection */
module.exports.profileDelete = function (req, res) {

  console.log("Deleting user");

  //if (!req.payload._id && req.userRole != 'admin') {
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

  /*var user = User.db.users.findAndModify({
    query: {'_id' : req.body._id},
    update: { 
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName
      }
    },
    new: true,
  }).then(()=>{
    console.log(user);
  });*/

  User
    .findByIdAndUpdate(req.body._id, req.body/*{
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        createPriv: req.body.createPriv,
        editPriv: req.body.editPriv,
        deletePriv: req.body.deletePriv,
      }
    }*/, {new: true}, function (err, doc) {

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
module.exports.userCollection = function (req, res) {

  User
    .find({})
    .exec(function (err, user) {
      //console.log(user);
      res.status(200).json(user);
    });

}
