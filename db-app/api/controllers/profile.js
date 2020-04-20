var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.nameCheck = function(req, res) {

  // Make sure all fields are filled
  if(!req.body.userName) {
    sendJSONresponse(res, 400, {
      "message": "username required"
    });
    return;
  }

};
