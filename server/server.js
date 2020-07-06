const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('./api/models/user');
require('./api/config/passport');

// API routes
const routesApi = require('./api/routes/index');
//const userRoutes = require('./api/routes/users');
const donorsRoutes = require('./api/routes/donors');
const controlDonorsRoutes = require('./api/routes/control-donors');
const cremationRoute = require('./api/routes/cremation-inventory');
const adultRoute = require('./api/routes/adult-inventory');
const subadultRoute = require('./api/routes/subadult-inventory');
const postcranRouter = require('./api/routes/postcran-metrics');
const fullyRouter = require('./api/routes/fully-metrics');

const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

const app = express();
var distDir = __dirname + "/dist/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(distDir));

// Setting up the database connection
try {
    mongoose.connect("mongodb+srv://Default:2HKD3KU4rxGfRSwP@body-farm-db-test-ledxr.gcp.mongodb.net/live-people?retryWrites=true&w=majority", connectionOptions).then(() => {
        var server = app.listen(process.env.PORT || 8080, () => {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

// Cors usage for backend request
app.use(cors());

// Initialize passport and forward routes
app.use(passport.initialize());
app.use('/api', routesApi);
//app.use('/api/users', userRoutes);
app.use('/api/donors', donorsRoutes);
app.use('/api/control-donors', controlDonorsRoutes);
app.use('/api/cremation-inventory', cremationRoute);
app.use('/api/subadult-inventory', subadultRoute);
app.use('/api/adult-inventory', adultRoute);
app.use('/api/fully-metric', fullyRouter);
app.use('/api/postcran-metric', postcranRouter);
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