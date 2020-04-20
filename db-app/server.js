const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// Bring in user schema
require('./api/models/user');

// [SH] Bring in the Passport config after model is defined
require('./api/config/passport');

// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/index');

const userRoutes = require('./api/routes/users');
const donorsRoutes = require('./api/routes/donors');

const Donor = require('./api/models/donor');

const app = express();
var distDir = __dirname + "/dist/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(distDir));

try {
    /* This is one of the simpliest ways of connecting,
        however this is a whitelist server port then. 
        Meaning that anyone can access this via the web.
        We need to double back to makesure it's a secure connection rather than */
    mongoose.connect("mongodb+srv://Default:2HKD3KU4rxGfRSwP@body-farm-db-test-ledxr.gcp.mongodb.net/live-people?retryWrites=true&w=majority").then(() => {
        var server = app.listen(process.env.PORT || 8080, () => {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

// Initialize passport and forward routes
var URL = '/api';
//var URL = 'http://localhost:8080/api/';
app.use(passport.initialize());
app.use(URL, routesApi);
//app.use('/api/users', userRoutes);
//app.use('/api/donors', donorsRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;