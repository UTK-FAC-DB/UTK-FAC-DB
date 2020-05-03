var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  donorRegEditPriv: {
    type: Boolean,
    required: true
  },
  donorRegCreatePriv: {
    type: Boolean,
    required: true
  },
  donorRegDeletePriv: {
    type: Boolean,
    required: true
  },
  donorControlEditPriv: {
    type: Boolean,
    required: true
  },
  donorControlCreatePriv: {
    type: Boolean,
    required: true
  },
  donorControlDeletePriv: {
    type: Boolean,
    required: true
  },
  inventoryEditPriv: {
    type: Boolean,
    required: true
  },
  inventoryCreatePriv: {
    type: Boolean,
    required: true
  },
  inventoryDeletePriv: {
    type: Boolean,
    required: true
  },
  donorMetricEditPriv: {
    type: Boolean,
    required: true
  },
  donorMetricCreatePriv: {
    type: Boolean,
    required: true
  },
  donorMetricDeletePriv: {
    type: Boolean,
    required: true
  },
  validUser: {
    type: Boolean,
    require: true
  },
  hash: String, // Password hash
  salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    userName: this.userName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);
