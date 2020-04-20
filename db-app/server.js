const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require('./api/models/user');
require('./api/config/passport');

// API routes
const routesApi = require('./api/routes/index');
//const userRoutes = require('./api/routes/users');
const donorsRoutes = require('./api/routes/donors');

const Donor = require('./api/models/donor');

const app = express();
var distDir = __dirname + "/dist/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(distDir));

// Setting up the database connection
try {
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
app.use(passport.initialize());
app.use('/api', routesApi);
//app.use('/api/users', userRoutes);
app.use('/api/donors', donorsRoutes);

/* Error handling */

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Unauthorized user error
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// Development errors (so like everything)
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;